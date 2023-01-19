import { useState, useEffect, useMemo } from "react"

export const useForm = (initialForm = {}, formValidations = {}) => {


    const [input, setInput] = useState(initialForm)
    const [formValidation, setFormValidation] = useState({})


    useEffect(() => {
        createValidators();
    }, [input])

    useEffect(() => {
        setInput(initialForm)
    }, [initialForm])


    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false
        }
        return true
    }, [formValidation])


    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }


    const handleReset = () => {
        setInput(initialForm)
    }

    const createValidators = () => {
        const formValues = {}
        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField]
            formValues[`${formField}Valid`] = fn(input[formField]) ? null : errorMessage
        }
        setFormValidation(formValues)
    }


    return {
        ...input,
        input,
        handleInputChange,
        handleReset,
        ...formValidation,
        isFormValid
    }
}