import axios from 'axios';

// add category
// POST /api/v2/admin/category

export const addCategory = ({ values }) => {
  try {
    axios.post('/api/v2/admin/category', { values }).then((res) => {
      console.log('Category Added to database sucessfully');
    });
  } catch (e) {
    console.log(e);
  }
};

// get categories
// api/v2/admin/getcategory', (req, res) => {

export const getCategory = async () => {
  try {
    const data = await axios.get('/api/v2/admin/getcategory');
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteCategory = (id) => {
  try {
    axios.delete(`api/v2/admin/category/${id}`).then((res) => {
      console.log('category deleted sucessfully');
    });
  } catch (e) {
    console.log(e);
  }
};
