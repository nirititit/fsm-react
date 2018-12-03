function post( relURL, data )
{
  return new Promise(
    ( resolve, reject )=>
    {
      let xhr = new XMLHttpRequest();

      xhr.open( "POST", `${window.location.protocol}//${window.location.hostname}:8080${relURL}`, true );
      xhr.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );
      //xhr.setRequestHeader( 'Content-Length', Buffer.byteLength(data));
      xhr.onreadystatechange= () =>
      {
        if( xhr.readyState === 4 )
        {
          if( xhr.status === 200 ) resolve( xhr.response );
          else                     reject( xhr );
        }
      };
      xhr.send( data );
    });
}

function get( relURL, data ){
  return new Promise(( resolve, reject ) => {

    let xhr = new XMLHttpRequest();

    xhr.open('GET', `${window.location.protocol}//${window.location.hostname}:8080${relURL}`);
    xhr.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );
    xhr.onreadystatechange= () =>
    {
      if( xhr.readyState === 4 )
      {
        if( xhr.status === 200 ) resolve( xhr.response );
        else                     reject( xhr );
      }
    };
    xhr.send(data);
  });
}


export default{
  post,
  get
}
