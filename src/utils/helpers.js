const validateFormLogin = (formData) => {
    let formErrors = {};

    if (!formData.email) {
        formErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        formErrors.email = 'El correo electrónico no es válido.';
    } else if (formData.email.length < 5) {
        formErrors.email = 'El correo electrónico debe tener al menos 5 caracteres.';
    } else if (formData.email.length > 50) {
        formErrors.email = 'El correo electrónico no puede tener más de 50 caracteres.';
    }

    if (!formData.password) {
        formErrors.password = 'La contraseña es obligatoria.';
    } else if (formData.password.length < 8) {
        formErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
    } else if (formData.password.length > 50) {
        formErrors.password = 'La contraseña no puede tener más de 50 caracteres.';
    }

    return formErrors;
};

const validateFormRegister = (formData) => {
    let formErrors = {};

    if (!formData.first_name) {
    formErrors.first_name = 'El nombre es obligatorio.';
    } else if (!/^[a-zA-Z]+$/.test(formData.first_name)) {
    formErrors.first_name = 'El nombre solo puede contener caracteres alfabéticos.';
    } else if (formData.first_name.length < 2) {
    formErrors.first_name = 'El nombre debe tener al menos 2 caracteres.';
    } else if (formData.first_name.length > 50) {
    formErrors.first_name = 'El nombre no puede tener más de 50 caracteres.';
    }

    if (!formData.last_name) {
    formErrors.last_name = 'El apellido es obligatorio.';
    } else if (!/^[a-zA-Z]+$/.test(formData.last_name)) {
    formErrors.last_name = 'El apellido solo puede contener caracteres alfabéticos.';
    } else if (formData.last_name.length < 2) {
    formErrors.last_name = 'El apellido debe tener al menos 2 caracteres.';
    } else if (formData.last_name.length > 50) {
    formErrors.last_name = 'El apellido no puede tener más de 50 caracteres.';
    }

    if (!formData.phone) {
    formErrors.phone = 'El teléfono es obligatorio.';
    } else if (!/^\d+$/.test(formData.phone)) {
    formErrors.phone = 'El teléfono solo puede contener números.';
    } else if (formData.phone.length < 7) {
    formErrors.phone = 'El teléfono debe tener al menos 7 caracteres.';
    } else if (formData.phone.length > 15) {
    formErrors.phone = 'El teléfono no puede tener más de 15 caracteres.';
    }

    if (!formData.email) {
    formErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    formErrors.email = 'El correo electrónico no es válido.';
    } else if (formData.email.length < 5) {
    formErrors.email = 'El correo electrónico debe tener al menos 5 caracteres.';
    } else if (formData.email.length > 50) {
    formErrors.email = 'El correo electrónico no puede tener más de 50 caracteres.';
    }

    if (!formData.password) {
    formErrors.password = 'La contraseña es obligatoria.';
    } else if (formData.password.length < 8) {
    formErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
    } else if (formData.password.length > 50) {
    formErrors.password = 'La contraseña no puede tener más de 50 caracteres.';
    }

    return formErrors;
};

export { validateFormLogin , validateFormRegister };