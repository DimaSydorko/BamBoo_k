import { Field, Form, Formik } from 'formik';
import React from 'react';
import { MyInput } from '../common/formControls';
import { FilterType } from '../../redux/peopleReducer';

type FormType = {
  term: string
  friend: "true" | "false" | "null"
}

type PropsType = {
  onFilterChanged: (filter: FilterType) => void
}
const UserSearchForm: React.FC<PropsType> = React.memo((props) => {
  const submit = (values: FormType, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
    const filter: FilterType = {
      term: values.term,
      friend: values.friend === "null" ? null : values.friend === "true" ? true : false
    }

    props.onFilterChanged(filter)
    setSubmitting(false)
  }

  return <>
    <Formik 
      initialValues={{term: '', friend: "null"}}
      validationSchema={{}}
      onSubmit={submit}>
    
        {({handleSubmit}) => (
          <Form onSubmit={handleSubmit}>
            <label>Search</label>
            <Field name="friend" as='select'>
              <option value="null">All</option>
              <option value="true">Only followed</option>
              <option value="false">Only unfollowed</option>
            </Field>
              <MyInput
                name={"term"}
                placeholder={"Search..."}
              />
              <button>Search</button>
          </Form>
        )}
    </Formik>
  </>
})

export default UserSearchForm