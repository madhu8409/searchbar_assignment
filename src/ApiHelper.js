import axios from 'axios';
export const BASE_URL="https://searchv7.expertrec.com"
export class ApiHelper {
      async get(uri) {
    // const response = await axios.get(uri, {
    //   headers: headers
    //     ? headers
    //     : { organization: '60ba3575e1bc3c06e220ab5a', token: accessToken },
    // });

    const response = await axios.get(uri);
    return response;
  }
  
}
