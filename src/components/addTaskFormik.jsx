import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { levels } from '../models/levels.num';
import * as Yup from 'yup';


const TaskSchema = Yup.object().shape(
  {
    tittle: Yup.string()
      .required('the tittle is required')
      .min(6, "the min characters of the tittle is six")
      .max(16, "the max characters of the tittle is 16"),
    description: Yup.string()
      .max(250, "the max characters of the description is 250")
      .required('The description is required'),
    completed: Yup.bool(),
    level: Yup.string()
  }
)


function AddTaskFormik() {

  const initialValues = {
    tittle: "",
    description: "",
    completed: false,
    level: levels.Normal
  }




  return (
    <div className='container-form'>
      <Formik
        initialValues={initialValues}
        validationSchema={TaskSchema}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 1000));
          alert(JSON.stringify(values, null, 2));
          localStorage.setItem('credentials', values);
          console.log(values)
        }}

      >
        {
          ({
            values,
            errors,
            touched,
            handleChange
          }) => (
            <Form className='formulario'>
              <h1>AddTasks</h1>
              <div>
                <label htmlFor="tittle"></label>
                <Field placeholder='Tittle' id="tittle" type="text" name="tittle" />
                {
                  errors.tittle && touched.tittle && (
                    <ErrorMessage className="errors"  name="tittle" component='div' />
                  )
                }
              </div>

              <div>
                <label htmlFor="description"></label>
                <Field placeholder='description' id="description" type="text" name="description" />
                {
                  errors.tittle && touched.tittle && (
                    <ErrorMessage className="errors" name="description" component='div' />
                  )
                }
              </div>

              <div className='btns'>
              <select name="level" id="level" onChange={handleChange} >

                  <option value={levels.Normal}> Normal </option>
                  <option value={levels.Urgente}> urgente </option>
                  <option value={levels.Blockinig}> Blocking </option>
                </select>
                <button > Add Task </button> 
              </div>



            </Form>
          )}

      </Formik>
    </div>
  )
}

export default AddTaskFormik


