import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { getvariations } from './api/variations';
import TextField from '../components/TextField';
import * as Yup from 'yup';
import './ProductVariationScreen.css';
import { getProduct } from './api/products';

const ProductVariationScreen = ({ match, history, heading }) => {
  const [productVariations, setProductVariations] = useState([]);
  const [variationId, setVariationId] = useState(null);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);

  const [color, setColor] = useColor('hex', '#121212');
  const [colorPalette, setColorPalette] = useState('hidden');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [formikFileArray, setFormikFileArray] = useState([]);

  const handleImageChange = (e, formik) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

     // console.log('filesArray: ', filesArray);
      setSelectedFiles((prevImages) => prevImages.concat(filesArray));

      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
    setFormikFileArray([e.target.files]);
    formik.setFieldValue('images', formikFileArray);
  };

  const handleRemoveImage = (e, fileToRemove, index, source) => {
    e.preventDefault();
    console.log(fileToRemove);

    source = source.filter((fileName) => fileName !== fileToRemove);

    console.log(formikFileArray[0])
    console.log(
      formikFileArray.filter((fileName) => fileName !== fileToRemove)
      
    );
    setSelectedFiles(source);
  };

  const renderPhotos = (source) => {
    //.log('source: ', source);

    return source.map((photo, index) => {
      return (
        <div className="col w-100">
          <Card
            className="my-2 p-1 rounded"
            style={{ height: '180px', objectFit: 'contain' }}
          >
            <Card.Img
              style={{ height: '170px', objectFit: 'contain' }}
              src={photo}
              variant="top"
              key={photo}
            />
          </Card>
          <div className="col mx-1">
            <button
              onClick={(e) =>
                handleRemoveImage(e, source[index], index, source)
              }
              type="button"
              className="btn btn-danger w-100"
            >
              Remove
            </button>
          </div>
        </div>
      );
    });
  };

  const handleClick = (e, id) => {
    setVariationId(id);
  };
  const productId = match.params.id;

  const varId = match.params.variationId;

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await getProduct();
      data.data.map((product) => {
        if (product.id == productId) {
          setCurrentProduct(product);
          // console.log(product);

          product.variations.map((variations) => {
            if (variations.id == varId) {
              setImages();

              setSelectedFiles(variations.images);
              //  console.log(images);
              setProductVariations(variations);
              console.log(productVariations);
            }
            //  console.log(variationId);
            //
            variations.images.map((variationimages) => {
              // console.log(variationimages);
            });
          });

          // console.log(product);
        }
      });
    };
    fetchProducts();
  }, []);

  const validate = Yup.object({
    name_ar: Yup.string().required('Required'),
    name_en: Yup.string().required('Required'),
    images: Yup.array().required('Required'),
    product_id: Yup.number().required('Required'),
    price: Yup.number().required('Required'),
    offerprice: Yup.number(),
    hasoffer: Yup.number(),
    stocks: Yup.number(),
    sku: Yup.string(),
    color_name: Yup.string(),
    color_value: Yup.string(),
  });

  const handleColorPicker = (e) => {
    e.preventDefault();
    if (colorPalette === 'hidden') {
      setColorPalette('show');
    } else {
      setColorPalette('hidden');
    }
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          name_ar: productVariations.bio_ar || '',
          name_en: productVariations.bio_en || '',
          images: '',
          price: productVariations.price || '',
          offerprice: productVariations.offerprice || '',

          stocks: productVariations.stocks || '',
          sku: productVariations.sku || '',
          color_name: productVariations.color_name || '',
          color_value: productVariations.color_value || color.hex,
        }}
        validationSchema={validate}
      >
        {(formik) => (
          <div className="my-4">
            <h3 className="pb-3 border-bottom main-heading-global">
              Product Variation
            </h3>
            <Form>
              {console.log(formik.values)}
              <div className="row g-3">
                <div className="col-md-6">
                  <TextField label="Arabic Name" name="name_ar" type="text" />
                </div>
                <div className="col-md-6">
                  <TextField label="English Name" name="name_en" type="text" />
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <TextField label="Price" name="price" type="number" />
                </div>
                <div className="col-md-6">
                  <TextField
                    label="Offer Price"
                    name="offerprice"
                    type="number"
                  />
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <TextField label="Stock" name="stocks" type="number" />
                </div>
                <div className="col-md-6">
                  <TextField label="SKU" name="sku" type="number" />
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-3 ">
                  <label
                    style={{ cursor: 'pointer' }}
                    className="text-nowrap border py-3 px-4 text-light add-photo  rounded"
                    htmlFor="file"
                  >
                    <i className="px-2 pb-1 bi bi-images"></i>
                    ADD PHOTO
                  </label>
                </div>
              </div>
              <div className="row g-3">
                <div className="col-md-12">
                  <div>
                    <input
                      name="images"
                      type="file"
                      id="file"
                      multiple
                      onChange={(e) => handleImageChange(e, formik)}
                    />
                    {console.log(selectedFiles)}
                    <div className="result">{renderPhotos(selectedFiles)}</div>
                  </div>
                </div>
              </div>
              <div className="row g-3">
                <div className="col-md-6">
                  <TextField label="Color Name" name="color_name" type="text" />
                </div>
              </div>
              <div className="row g-3">
                <div className="col-md-3">
                  <TextField
                    label="Color Value"
                    name="color_value"
                    type="text"
                  />
                </div>
                <div className="col-md-3">
                  <button
                    onClick={handleColorPicker}
                    className="my-4 btn btn-info w-100 h-50"
                    style={{ backgroundColor: `${color.hex}` }}
                  ></button>
                </div>
              </div>

              {colorPalette === 'show' ? (
                <div className="row g-3 w-50 mt-1">
                  <div className="col-md-4">
                    <ColorPicker
                      width={250}
                      height={100}
                      color={color}
                      onChange={setColor}
                      hideHSV
                      dark
                    />
                    <button
                      onClick={handleColorPicker}
                      className="btn rounded bg-success w-100 mx-3 my-1 mt-1"
                    >
                      Ok
                    </button>
                  </div>
                </div>
              ) : (
                ''
              )}

              <button className={`btn btn-dark mt-3`} type="submit">
                Save
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default ProductVariationScreen;
