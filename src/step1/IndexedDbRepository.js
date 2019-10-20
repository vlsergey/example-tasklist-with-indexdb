
if ( !window.indexedDB ) window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
if ( !window.IDBTransaction ) window.IDBTransaction = window.webkitIDBTransaction || window.msIDBTransaction;
if ( !window.IDBKeyRange ) window.IDBKeyRange = window.webkitIDBKeyRange || window.msIDBKeyRange;
if ( !window.indexedDB ) throw new Error( 'IndexedDB is not awailable' );

const DB_NAME = 'objectStore';
const OBJECT_STORE_NAME = 'objectStore';

// Функция оборачивает обращение к indexedDB.open в Promise
function openDatabasePromise( keyPath : string ) : Promise< IDBDatabase > {
  return new Promise( ( resolve, reject ) => {
    const dbOpenRequest = window.indexedDB.open( DB_NAME, 1 );

    dbOpenRequest.onblocked = () => {
      reject( 'Требуется обновление структуры базы данных, хранимой в вашем браузере, ' +
        'но браузер уведомил о блокировке базы данных.' );
    };

    dbOpenRequest.onerror = err => {
      console.log( 'Unable to open indexedDB ' + DB_NAME );
      console.log( err );
      reject( 'Невозможно открыть базу данных, либо при её открытии произошла неисправимая ошибка.' +
       ( err.message ? 'Техническая информация: ' + err.message : '' ) );
    };

    dbOpenRequest.onupgradeneeded = event => {
      const db = event.target.result;
      try {
        db.deleteObjectStore( OBJECT_STORE_NAME );
      } catch ( err ) { console.log( err ); }
      db.createObjectStore( OBJECT_STORE_NAME, { keyPath } );
    };

    dbOpenRequest.onsuccess = () => {
      console.info( 'Successfully open indexedDB connection to ' + DB_NAME );
      resolve( dbOpenRequest.result );
    };

    dbOpenRequest.onerror = reject;
  } );
}

// Оборачиваем функции от ObjectStore, поддерживающие интерфейс IDBRequest
// в вызов с использованием Promise
function wrap( methodName : string ) {
  return function() {
    const [ objectStore, ...etc ] = arguments;
    return new Promise( ( resolve, reject ) => {
      const request = objectStore[ methodName ]( ...etc );
      request.onsuccess = () => resolve( request.result );
      request.onerror = reject;
    } );
  };
}
const deletePromise = wrap( 'delete' );
const getAllPromise = wrap( 'getAll' );
const getPromise = wrap( 'get' );
const putPromise = wrap( 'put' );

export default class IndexedDbRepository {

  dbConnection : ?IDBDatabase;
  error : ?any;
  openDatabasePromise : Promise< IDBDatabase >;

  constructor( keyPath : string ) {
    this.error = null;
    this.keyPath = keyPath;

    // конструктор нельзя объявить как async
    // поэтому вынесено в отдельную функцию
    this.openDatabasePromise = this._openDatabase( keyPath );
  }

  async _openDatabase( keyPath : string ) {
    try {
      this.dbConnection = await openDatabasePromise( keyPath );
    } catch ( error ) {
      this.error = error;
      throw error;
    }
  }

  async _tx( txMode : string, callback ) {
    await this.openDatabasePromise; // await db connection
    const transaction : IDBTransaction = this.dbConnection.transaction( [ OBJECT_STORE_NAME ], txMode );
    const objectStore : IDBObjectStore = transaction.objectStore( OBJECT_STORE_NAME );
    return await callback( objectStore );
  }

  async findAll() : Promise< any[] > {
    return this._tx( 'readonly', objectStore => getAllPromise( objectStore ) );
  }

  async findById( key ) : Promise< any > {
    return this._tx( 'readonly', objectStore => getPromise( objectStore, key ) );
  }

  async deleteById( key ) : Promise< any > {
    return this._tx( 'readwrite', objectStore => deletePromise( objectStore, key ) );
  }

  async save( item : any ) : Promise< any > {
    return this._tx( 'readwrite', objectStore => putPromise( objectStore, item ) );
  }

}
