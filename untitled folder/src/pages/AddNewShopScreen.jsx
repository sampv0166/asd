/*  shop_name_ar	String	✅
shop_name_en	String	✅
image	File	✅
email	email	✅
password	String	✅
shop_trn	String	
shop_mob	String	
shop_website	String	
open	1/0	
booth	Number	  */

import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import TextField from '../components/TextField';
import { Formik, Form } from 'formik';
import { Col, Row } from 'react-bootstrap';
import { addShop, getShops, updateShop } from './api/shop';

import { Card } from 'react-bootstrap';

const AdddNewShopScreen = ({ match, history }) => {
  const [currentShop, setCurrentshop] = useState([]);
  const [productImage, setProductImage] = useState([]);
  const shopId = match.params.id;

  const validate = Yup.object({
    shop_name_en: Yup.string().required('Required'),
    email: Yup.string().required('Required'),
    image: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    shop_trn: Yup.string(),
    shop_mob: Yup.string(),
    shop_website: Yup.string(),
    open: Yup.number(),
    booth: Yup.number(),
  });

  const handleImageChange = (e, formik) => {
    if (e.target.files) {
      const U = URL.createObjectURL(e.target.files[0]);
      setProductImage(U);
      URL.revokeObjectURL(e.target.files);
    }
    formik.setFieldValue('image', e.currentTarget.files[0]);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const fetchShops = async () => {
      const data = await getShops(user.success.token);
      data.data.map((shop, index) => {
        if (shop.id == shopId) {
          console.log(shop);
          setCurrentshop(shop);
        }
      });
    };
    fetchShops();

    console.log(currentShop);
  }, []);

  const handleSubmit = async (formdata) => {
    if (shopId) {
      await updateShop(formdata, shopId);
    } else {
      await addShop(formdata);
    }

    // history.push('/product');
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <Formik
          enableReinitialize
          initialValues={{
            shop_name_en: currentShop.shop_name || '',
            email: currentShop.email || '',
            image: currentShop.image || '',
            password: '',
            shop_trn: currentShop.shop_trn || '',
            shop_mob: currentShop.shop_mob || '',
            shop_website: currentShop.shop_website || '',
            open: '',
            booth: '',
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            //console.log(values.name_ar)
            let formdata = new FormData();
            formdata.append('id', shopId);
            formdata.append('shop_name_en', values.shop_name_en);
            formdata.append('shop_name_ar', values.shop_name_ar);
            formdata.append('name_en', values.shop_name_ar);
            formdata.append('email', values.email);
            formdata.append('image', values.image);
            formdata.append('password', values.password);
            formdata.append('shop_trn', values.shop_trn);
            formdata.append('shop_mob', values.shop_mob);
            formdata.append('shop_website', values.shop_website);
            formdata.append('open', values.open);
            formdata.append('booth', values.booth);
            handleSubmit(formdata);
          }}
        >
          {(formik) => (
            <div className="my-4">
              <div className="row">
                <div className="col-5">
                  {/*console.log(formik.values)*/}
                  {shopId ? (
                    <Card
                      className="my-2 p-1 rounded"
                      style={{ height: '280px', objectFit: 'cover' }}
                    >
                      <Card.Img
                        style={{ height: '270px', objectFit: 'contain' }}
                        src={
                          'https://www.khaymatapi.mvp-apps.ae/storage/' +
                          currentShop.shop_coverImage
                        }
                        variant="top"
                      />
                      <div className="d-flex my-3">
                        <span className="icon icon-md"></span>
                        <input
                          type="file"
                          onChange={(e) => handleImageChange(e, formik)}
                          name="image"
                        />
                      </div>
                    </Card>
                  ) : (
                    <Card
                      className="my-2 p-1 rounded"
                      style={{ height: '280px', objectFit: 'cover' }}
                    >
                      <Card.Img
                        style={{ height: '270px', objectFit: 'contain' }}
                        src={productImage}
                        variant="top"
                      />
                      <div className="d-flex my-3">
                        <span className="icon icon-md"></span>
                        <input
                          type="file"
                          onChange={(e) => handleImageChange(e, formik)}
                          name="image"
                        />
                      </div>
                    </Card>
                  )}
                </div>

                <div className="col-7">
                  <Row>
                    <Form>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <TextField
                            label="English Name"
                            name="shop_name_en"
                            type="text"
                          />
                        </div>
                        <div className="col-md-6">
                          <TextField
                            label="Password"
                            name="password"
                            type="password"
                          />
                        </div>
                      </div>

                      <div className="row g-3">
                        <div className="col-md-6">
                          <TextField
                            label="Shop TRN"
                            name="shop_trn"
                            type="text"
                          />
                        </div>

                        <Col>
                          <TextField label="Email" name="email" type="text" />
                        </Col>
                      </div>
                      <div className="row g-3">
                        <Col>
                          <TextField
                            label="Shop Website"
                            name="shop_website"
                            type="text"
                          />
                        </Col>
                        <div className="col-md-6">
                          <TextField
                            label="Shop Mob"
                            name="shop_mob"
                            type="text"
                          />
                        </div>
                      </div>

                      <button
                        className="btn btn-success mt-3 my-2"
                        type="submit"
                      >
                        Save
                      </button>
                    </Form>
                  </Row>
                </div>
              </div>
            </div>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default AdddNewShopScreen;
