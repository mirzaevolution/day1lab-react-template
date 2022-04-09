import { Formik } from 'formik';
import React from 'react'
import "./form-sample.page.css"
import * as Yup from 'yup';
import { Label, PrimaryButton, TextField } from '@fluentui/react';
import { useAppDispatch } from '../../reduxs/hook';
import { setFormData } from '../../reduxs/slices/main.slice';
import { GuestModel } from '../../models';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { EtcHelpersInit } from '../../utils';

const FormSample: React.FC = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation();
  const navigate = useNavigate()

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        address: ''
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().required(t("This Field is Required")),
        lastName: Yup.string().required(t("This Field is Required"))
      })}
      onSubmit={(values:GuestModel) => {
        dispatch(setFormData(values))
        navigate("/")
      }}
    >
      {
        formik => (
          <div className='list-sample'>
            <div className="ms-Grid" style={{ width: "40%" }} dir="ltr">
              <form id='form-engagement' onSubmit={formik.handleSubmit} style={{ marginTop: "13px" }}>
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    <div className="ms-Grid-row gap-row">
                      <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg3">
                        <Label required>{t("First Name")}</Label>
                      </div>
                      <div className="ms-Grid-col ms-sm12 ms-md8 ms-lg9">
                        <TextField
                          onBlur={formik.handleBlur}
                          id='firstName'
                          errorMessage={EtcHelpersInit.getErrorMessageFormik(formik.touched.firstName, formik.errors.firstName)}
                          onChange={formik.handleChange}
                          name='firstName' />
                      </div>
                    </div>
                    <div className="ms-Grid-row gap-row">
                      <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg3">
                        <Label required>{t("Last Name")}</Label>
                      </div>
                      <div className="ms-Grid-col ms-sm12 ms-md8 ms-lg9">
                        <TextField
                          onBlur={formik.handleBlur}
                          id='lastName'
                          errorMessage={EtcHelpersInit.getErrorMessageFormik(formik.touched.lastName, formik.errors.lastName)}
                          onChange={formik.handleChange}
                          name='lastName' />
                      </div>
                    </div>
                    <div className="ms-Grid-row gap-row">
                      <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg3">
                        <Label >{t("Address")}</Label>
                      </div>
                      <div className="ms-Grid-col ms-sm12 ms-md8 ms-lg9">
                        <TextField multiline
                          onBlur={formik.handleBlur}
                          id='address'
                          errorMessage={EtcHelpersInit.getErrorMessageFormik(formik.touched.address, formik.errors.address)}
                          onChange={formik.handleChange}
                          name='address' />
                      </div>
                    </div>
                    <div className="ms-Grid-row gap-row">
                      <div className="ms-Grid-col ms-sm12 button-form ms-md12 ms-lg12">
                        <PrimaryButton type='submit' text={t("Create")} allowDisabledFocus />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )
      }
    </Formik>
  )
}

export default FormSample