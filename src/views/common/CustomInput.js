import { Fragment } from "react"
import { Input, Label } from "reactstrap"
import { ErrorMessage } from "formik"

const CustomInput = ({ field, form: { touched, errors }, label, placeholder, ...props }) => {
    return (
        <Fragment>
            <div className="input-sec mb-2">
                <Label>{label}</Label>
                <Input
                    {...field}
                    {...props}
                    placeholder={placeholder}
                    invalid={!!touched[field.name] && !!errors[field.name]}
                />
                <ErrorMessage name={field.name} component="div" className="text-danger" />
            </div>
        </Fragment>
    )
}

export default CustomInput
