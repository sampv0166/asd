

import axios from "axios";


// get variations
// /api/v2/admin/getvariations

export const getvariations = async () => {
    try {

      const data = await axios.get('/api/v2/admin/getvariations');

      return data;

    } catch (e) {

      console.log(e);
      
    }
  };
  