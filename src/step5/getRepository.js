import { IndexedDbRepository } from '@vlsergey/react-indexdb-repo';

const DB_NAME = 'Database';
const OBJECT_STORE_NAME = 'ObjectStore';
const KEY_PATH = 'id';

async function dbConnection( ) {
  return new Promise( ( resolve, reject ) => {
    const dbOpenRequest = window.indexedDB.open( DB_NAME, 1 );

    dbOpenRequest.onblocked = () => reject( 'onblocked' );
    dbOpenRequest.onerror = err => reject( err );
    dbOpenRequest.onsuccess = () => resolve( dbOpenRequest.result );
    dbOpenRequest.onupgradeneeded = event => {
      try {
        const db = event.target.result;
        try { db.deleteObjectStore( OBJECT_STORE_NAME ); } catch ( err ) { /* NOOP */ }
        db.createObjectStore( OBJECT_STORE_NAME, { keyPath: KEY_PATH } );
      } catch ( err ) {
        reject( err );
      }
    };
  } );
}

let db = null;
let repository = null;

dbConnection().then( result => {
  db = result;
  repository = new IndexedDbRepository( db, OBJECT_STORE_NAME, KEY_PATH );
} );

export default function getRepository() {
  return repository;
}
