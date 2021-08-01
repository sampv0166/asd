import axios from 'axios';

// add product
// POST /api/v2/admin/product

export const addProduct = async ( formdata) => {
  try {
   
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    
    const config = {
     headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    }

    const { data } = await axios.post('https://www.khaymatapi.mvp-apps.ae/api/v2/admin/product',formdata,
    config);

  } catch (e) {

    console.log(e);

  }
};
// update produuct
// POST /api/v2/admin/product
export const updateProduct = ({ values }) => {
  try {
    axios.post('/api/v2/admin/product', { values }).then((res) => {
      console.log('Product updated sucessfully');
    });
  } catch (e) {
    console.log(e);
  }
};

//delete product
// DELETE /api/v2/admin/product/{id}

export const deleteProduct = (id) => {
  try {
    axios.delete(`api/v2/admin/product/${id}`).then((res) => {
      console.log('Product deleted sucessfully');
    });
  } catch (e) {
    console.log(e);
  }
};

// get products
// /api/v2/admin/getproducts
export const getProduct = async () => {
  try {
    const data = await axios.get('https://www.khaymatapi.mvp-apps.ae/api/v2/public/product');
    return data;
  } catch (e) {
    console.log(e);
  }
};
