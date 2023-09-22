import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, shallowEqual, connect, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ModalProgressBar } from "../../../_metronic/_partials/controls";
import Select from 'react-select';
import Upload from "./upload.png";
import toast from "react-hot-toast";
import {useHistory} from 'react-router-dom'

function AddPhone(props) {
  // Fields
  const history=useHistory()

  const [loading, setloading] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [colorsArray,SetColorsArray]=useState([])
  const [company,setCompany]=useState('')
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user, shallowEqual);

  // Methods
  const saveUser = (values, setStatus, setSubmitting) => {
    setloading(true);
      setSubmitting(true);

    const myForm = new FormData();

    myForm.set("name", values.name);
    myForm.set("price", values.price);
    myForm.set("description", values.description);
    myForm.set("stock", values.stock);
    myForm.set("company", company);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    colorsArray.forEach((colors) => {
      myForm.append("colors", colors.value);
    });

    fetch(`https://mobile-store-km17iiqc8-gulraizzafar64.vercel.app/api/v1/createProduct`, {
        method: 'POST',
        body: myForm
      }).then(res => res.json()
        .then(data => {
         console.log(data)
            setloading(false);
      setSubmitting(false);
      toast.success('Added Successfully')
      history.push('/phone')
        })
  
      ).catch(err => {
        setloading(false);
        setSubmitting(false);
      toast.error('SomeThing Went Wronge Please Try Again')
       console.log(err)
      })
    // setTimeout(() => {
    //   setloading(false);
    //   setSubmitting(false);
    
    // }, 1000);
  };
  // UI Helpers
  const initialValues = {
    name: '',
    description: '',
    price: '',
  };
  const Schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required"),
    stock: Yup.number().required("Stock is required"),
  });
  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };
  const formik = useFormik({
    initialValues,
    validationSchema: Schema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      saveUser(values, setStatus, setSubmitting);
    },
    onReset: (values, { resetForm }) => {
      resetForm();
    },
  });
  let companyArray = [
    { label: "Apple", value: "Apple" },
    { label: "Samsung", value: "Samsung" },
    { label: "Huawei", value: "Huawei" },
    { label: "Xiaomi", value: "Xiaomi" },
    { label: "Oppo", value: "Oppo" },
    { label: "Vivo", value: "Vivo" },
    { label: "Realme", value: "Realme" },
    { label: "OnePlus", value: "OnePlus" },
    { label: "Google", value: "Google" },
    { label: "Sony", value: "Sony" },
    { label: "LG", value: "LG" },
    { label: "Nokia", value: "Nokia" },
    { label: "Tecno Mobile", value: "Tecno Mobile" },
    { label: "infinix", value: "infinix" },
];

  let colors = [
    { label: "AliceBlue", value: "aliceblue" },
    { label: "AntiqueWhite", value: "antiquewhite" },
    { label: "Aqua", value: "aqua" },
    { label: "Aquamarine", value: "aquamarine" },
    { label: "Azure", value: "azure" },
    { label: "Beige", value: "beige" },
    { label: "Bisque", value: "bisque" },
    { label: "Black", value: "black" },
    { label: "BlanchedAlmond", value: "blanchedalmond" },
    { label: "Blue", value: "blue" },
    { label: "BlueViolet", value: "blueviolet" },
    { label: "Brown", value: "brown" },
    { label: "BurlyWood", value: "burlywood" },
    { label: "CadetBlue", value: "cadetblue" },
    { label: "Chartreuse", value: "chartreuse" },
    { label: "Chocolate", value: "chocolate" },
    { label: "Coral", value: "coral" },
    { label: "CornflowerBlue", value: "cornflowerblue" },
    { label: "Cornsilk", value: "cornsilk" },
    { label: "Crimson", value: "crimson" },
    { label: "Cyan", value: "cyan" },
    { label: "DarkBlue", value: "darkblue" },
    { label: "DarkCyan", value: "darkcyan" },
    { label: "DarkGoldenrod", value: "darkgoldenrod" },
    { label: "DarkGray", value: "darkgray" },
    { label: "DarkGreen", value: "darkgreen" },
    { label: "DarkKhaki", value: "darkkhaki" },
    { label: "DarkMagenta", value: "darkmagenta" },
    { label: "DarkOliveGreen", value: "darkolivegreen" },
    { label: "DarkOrange", value: "darkorange" },
    { label: "DarkOrchid", value: "darkorchid" },
    { label: "DarkRed", value: "darkred" },
    { label: "DarkSalmon", value: "darksalmon" },
    { label: "DarkSeaGreen", value: "darkseagreen" },
    { label: "DarkSlateBlue", value: "darkslateblue" },
    { label: "DarkSlateGray", value: "darkslategray" },
    { label: "DarkTurquoise", value: "darkturquoise" },
    { label: "DarkViolet", value: "darkviolet" },
    { label: "DeepPink", value: "deeppink" },
    { label: "DeepSkyBlue", value: "deepskyblue" },
    { label: "DimGray", value: "dimgray" },
    { label: "DodgerBlue", value: "dodgerblue" },
    { label: "Firebrick", value: "firebrick" },
    { label: "FloralWhite", value: "floralwhite" },
    { label: "ForestGreen", value: "forestgreen" },
    { label: "Fuchsia", value: "fuchsia" },
    { label: "Gainsboro", value: "gainsboro" },
    { label: "GhostWhite", value: "ghostwhite" },
    { label: "Gold", value: "gold" },
    { label: "Goldenrod", value: "goldenrod" },
    { label: "Gray", value: "gray" },
    { label: "Green", value: "green" },
    { label: "GreenYellow", value: "greenyellow" },
    { label: "Honeydew", value: "honeydew" },
    { label: "HotPink", value: "hotpink" },
    { label: "IndianRed", value: "indianred" },
    { label: "Indigo", value: "indigo" },
    { label: "Ivory", value: "ivory" },
    { label: "Khaki", value: "khaki" },
    { label: "Lavender", value: "lavender" },
    { label: "LavenderBlush", value: "lavenderblush" },
    { label: "LawnGreen", value: "lawngreen" },
    { label: "LemonChiffon", value: "lemonchiffon" },
    { label: "LightBlue", value: "lightblue" },
    { label: "LightCoral", value: "lightcoral" },
    { label: "LightCyan", value: "lightcyan" },
    { label: "LightGoldenrodYellow", value: "lightgoldenrodyellow" },
    { label: "LightGray", value: "lightgray" },
    { label: "LightGreen", value: "lightgreen" },
    { label: "LightPink", value: "lightpink" },
    { label: "LightSalmon", value: "lightsalmon" },
    { label: "LightSeaGreen", value: "lightseagreen" },
    { label: "LightSkyBlue", value: "lightskyblue" },
    { label: "LightSlateGray", value: "lightslategray" },
    { label: "LightSteelBlue", value: "lightsteelblue" },
    { label: "LightYellow", value: "lightyellow" },
    { label: "Lime", value: "lime" },
    { label: "LimeGreen", value: "limegreen" },
    { label: "Linen", value: "linen" },
    { label: "Magenta", value: "magenta" },
    { label: "Maroon", value: "maroon" },
    { label: "MediumAquamarine", value: "mediumaquamarine" },
    { label: "MediumBlue", value: "mediumblue" },
    { label: "MediumOrchid", value: "mediumorchid" },
    { label: "MediumPurple", value: "mediumpurple" },
    { label: "MediumSeaGreen", value: "mediumseagreen" },
    { label: "MediumSlateBlue", value: "mediumslateblue" },
    { label: "MediumSpringGreen", value: "mediumspringgreen" },
    { label: "MediumTurquoise", value: "mediumturquoise" },
    { label: "MediumVioletRed", value: "mediumvioletred" },
    { label: "MidnightBlue", value: "midnightblue" },
    { label: "MintCream", value: "mintcream" },
    { label: "MistyRose", value: "mistyrose" },
    { label: "White", value: "white" },
   
  ]
  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  return (
    <form
      className="card card-custom card-stretch"
      onSubmit={formik.handleSubmit}
    >
      {loading && <ModalProgressBar />}

      {/* begin::Header */}
      <div className="card-header py-3">
        <div className="card-title align-items-start flex-column">
          <h3 className="card-label font-weight-bolder text-dark">
            Add New Phone
          </h3>
          {/* <span className="text-muted font-weight-bold font-size-sm mt-1">
            Update your personal informaiton
          </span> */}
        </div>
        <div className="card-toolbar">
          <button
            type="submit"
            className="btn btn-primary mr-2"
            disabled={
              formik.isSubmitting || (formik.touched && !formik.isValid)
            }
          >
            Add Phone
            {formik.isSubmitting}
          </button>
          <Link
            to="/phone"
            className="btn btn-secondary"
          >
            Cancel
          </Link>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Form */}
      <div className="form">
        {/* begin::Body */}
        <div className="card-body">
          <div className="row">
            <label className="col-xl-3"></label>
            <div className="col-lg-9 col-xl-6">
              {/* <h5 className="font-weight-bold mb-6">Customer Info</h5> */}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
               Company
            </label>
            <div className="col-lg-9 col-xl-6">
            <Select
    options={companyArray}
    onChange={(e) => setCompany(e.value)}
    // formatGroupLabel={formatGroupLabel}
  />
   
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
               Name
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="text"
                placeholder="Enter Name"
                className={`form-control form-control-lg form-control-solid ${getInputClasses(
                  "name"
                )}`}
                name="name"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="invalid-feedback">
                  {formik.errors.name}
                </div>
              ) : null}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              Description
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="text"
                placeholder="Enter Description"
                className={`form-control form-control-lg form-control-solid ${getInputClasses(
                  "description"
                )}`}
                name="description"
                {...formik.getFieldProps("description")}
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="invalid-feedback">{formik.errors.description}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
               Price
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="text"
                placeholder="Enter Price"
                className={`form-control form-control-lg form-control-solid ${getInputClasses(
                  "price"
                )}`}
                name="price"
                {...formik.getFieldProps("price")}
              />
              {formik.touched.price && formik.errors.price ? (
                <div className="invalid-feedback">{formik.errors.price}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
               Stock
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="text"
                placeholder="Enter Stock"
                className={`form-control form-control-lg form-control-solid ${getInputClasses(
                  "stock"
                )}`}
                name="stock"
                {...formik.getFieldProps("stock")}
              />
              {formik.touched.stock && formik.errors.stock ? (
                <div className="invalid-feedback">{formik.errors.stock}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
               Colour
            </label>
            <div className="col-lg-9 col-xl-6">
            <Select
    options={colors}
    isMulti
    onChange={(e) => SetColorsArray(e)}
    // formatGroupLabel={formatGroupLabel}
  />
            </div>
          </div>
          <div className="col-12">
                  <div className="avatar-upload-input text-center">
                    <img src={Upload} alt="img" />
                    <h2>Upload PDF</h2>
                    {/* <p>Its must be a clean photo</p> */}
                    <div className="avatar-edit-input">
                      <input
                        className="form-control"
                        type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
                      />

                    </div>
                  </div>


                </div>


            <div style={{display:"flex"}}>
              {imagesPreview.map((image, index) => (
                <img height={200} width={200} style={{marginLeft:"10px",borderRadius:"10px"}} key={index} src={image} alt="Product Preview" />
              ))}
            </div>
        
          {/* <div className="row">
            <label className="col-xl-3"></label>
            <div className="col-lg-9 col-xl-6">
              <h5 className="font-weight-bold mt-10 mb-6">Contact Info</h5>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              Contact Phone
            </label>
            <div className="col-lg-9 col-xl-6">
              <div className="input-group input-group-lg input-group-solid">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-phone"></i>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="+1(123)112-11-11"
                  className={`form-control form-control-lg form-control-solid ${getInputClasses(
                    "phone"
                  )}`}
                  name="phone"
                  {...formik.getFieldProps("phone")}
                />
              </div>
              {formik.touched.phone && formik.errors.phone ? (
                <div className="invalid-feedback display-block">
                  {formik.errors.phone}
                </div>
              ) : null}
              <span className="form-text text-muted">
                We'll never share your phone with anyone else.
              </span>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              Email Address
            </label>
            <div className="col-lg-9 col-xl-6">
              <div className="input-group input-group-lg input-group-solid">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-at"></i>
                  </span>
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className={`form-control form-control-lg form-control-solid ${getInputClasses(
                    "email"
                  )}`}
                  name="email"
                  {...formik.getFieldProps("email")}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className="invalid-feedback display-block">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              Company Site
            </label>
            <div className="col-lg-9 col-xl-6">
              <div className="input-group input-group-lg input-group-solid">
                <input
                  type="text"
                  placeholder="https://keenthemes.com"
                  className={`form-control form-control-lg form-control-solid`}
                  name="website"
                  {...formik.getFieldProps("website")}
                />
              </div>
              {formik.touched.website && formik.errors.website ? (
                <div className="invalid-feedback display-block">
                  {formik.errors.website}
                </div>
              ) : null}
            </div>
          </div> */}
        </div>
      </div>
    </form>
  );
}

export default AddPhone