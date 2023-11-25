export type EventHandler = (e: { [key: string]: any;})=>void;
export namespace EventEmitter {
      const events = new Map<string, EventHandler[]>();
      export function fire( name: string, message: { [key: string]: any;} ){
            const handlers = events.get(name);
            if( !handlers || handlers.length <= 0 )
                  return;
            handlers.forEach( handler => handler( message ) );
      }
      export function on( name: string, handler: EventHandler ){
            const handlers = events.get(name);
            if( handlers )
                  handlers.push( handler );
            else 
                  events.set( name, [ handler ] );
      }
      export function remove( name: string, handler: EventHandler ){
            const handlers = events.get(name);
            if( !handlers || handlers.length <= 0 )
                  return;
            handlers.every( (elem, index)=> {
                  if( handler.toString() == elem.toString() ){
                        handlers.splice(index, 1);
                        return true;
                  }
                  return false;
            })
      }
      export function deleteEvent( name: string ){
            if( events.has( name ) )
                  events.delete( name );
      }
}