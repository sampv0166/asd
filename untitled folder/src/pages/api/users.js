import axios from 'axios';

// add product
// POST /api/v2/admin/product

export const addUser = ({ values }) => {
  try {
    axios.post('/api/v2/admin/product', { values }).then((res) => {
      console.log('Product Added to database sucessfully');
    });
  } catch (e) {
    console.log(e);
  }
};

// update produuct
// POST /api/v2/admin/product

export const updateUser = ({ values }) => {
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

export const deleteUser = (id) => {
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

export const getUsers = async (usertoken) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${usertoken}`,
      },
    };

    const { data } = await axios.get(
      'https://khaymatapi.mvp-apps.ae/api/v2/admin/users',
      config
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};
