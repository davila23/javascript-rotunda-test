
/*

We need some logic that extracts the variable parts of a url into a hash. The keys
of the extract hash will be the "names" of the variable parts of a url, and the
values of the hash will be the values. We will be supplied with:

1. A url format string, which describes the format of a url. A url format string
can contain constant parts and variable parts, in any order, where "parts"
of a url are separated with "/". All variable parts begin with a colon. Here is
an example of such a url format string:

'/:version/api/:collecton/:id'

2. A particular url instance that is guaranteed to have the format given by
the url format string. It may also contain url parameters. For example,
given the example url format string above, the url instance might be:
'/6/api/listings/3?sort=desc&limit=10'

Given this example url format string and url instance, the hash we want that
maps all the variable parts of the url instance to their values would look like this:

{
  version: 6,
  collection: 'listings',
  id: 3,
  sort: 'desc',
  limit: 10
}


*/

// ----------------------------- Conf ------------------------------ //

const regularExpresion = '^:[a-zA-Z0-9]';


// -------------------------- Parse URL -----------------------------//

/* 

The URL have two parts; one before '?' (Static) and another after (Variables).
Static : Because it always has the same amount and type of attributes --->  /:version/api/:collecton/:id .
Variable : In this case we have two  sort and limit , but can be more .

*/

const parse = (format,url)=>{
  
    const parts = url.split('?');

    // console.log('Static + Variables  :  ' +  parts );

    return {...extractStatic(format,parts[0]),...extractVariables(parts[1])}
     
  }

  /* -------------------------- Extrat Statics from URL --------------------------- */

  const extractStatic = (format,url)=>{
  
    // Split Data
    const names = format.split('/');
    const values = url.split('/');
  
    // Validate Exception
    if (!(values.length >= names.length))
      throw new Error('URL ERROR : The URL have ' + names.length + ' names and only ' + values.length + ' value');
  
    // Init Json
    let json = {};
    
    names.forEach((name,i)=>{
  
      if (name.match(regularExpresion)){
  
        const val   = name.replace(':','');
        json[val] = values[i];
  
      }
  
    });
  
    return json;
  
  }
  
  // ----------------------- Extrat Variables from URL ------------------------ //
 
    const extractVariables = (url)=>{
   
    const params = url.split('&');

    // console.log('params' + params) ;
  
    let variables = {};
  
    params.forEach(param=>{
      
        const parts = param.split('=');
        variables[parts[0]] = parts[1];
  
    });
  
    return variables;
  
  }
  
// ----------------------------- Test Case ------------------------------ //

  let format = '/:version/api/:collection/:id';
  let url   = '/6/api/listings/3?sort=desc&limit=10';

  
  let tmp = parse(format,url);
  console.log(tmp);