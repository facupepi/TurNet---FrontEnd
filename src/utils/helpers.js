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

// Validación de los datos de un servicio
export const validateServiceData = (data) => {
    const errors = {};

    // Validación del nombre del servicio
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 3) {
        errors.name = 'El nombre del servicio debe tener al menos 3 caracteres.';
    }

    // Validación de la duración
    if (!data.duration || isNaN(data.duration) || data.duration <= 0 || !Number.isInteger(Number(data.duration))) {
        errors.duration = 'La duración debe ser un número entero positivo.';
    }

    // Validación del precio
    if (!data.price || isNaN(data.price) || data.price <= 0) {
        errors.price = 'El precio debe ser un número mayor a 0.';
    }

    // Validación del período de reserva
    if (!data.reservation_period || isNaN(data.reservation_period) || data.reservation_period < 1 || !Number.isInteger(Number(data.reservation_period))) {
        errors.reservation_period = 'El período de reserva debe ser un número entero positivo mayor a 0.';
    }

    // Validación de los días
    if (!Array.isArray(data.days) || data.days.some((day) => typeof day !== 'string' || day.trim().length === 0)) {
        errors.days = 'Debe seleccionar al menos un día válido.';
    }

    // Validación del horario de inicio y fin
    if (!data.startTime || !/^\d{2}:\d{2}$/.test(data.startTime)) {
        errors.startTime = 'La hora de inicio debe estar en formato HH:MM.';
    }
    if (!data.endTime || !/^\d{2}:\d{2}$/.test(data.endTime)) {
        errors.endTime = 'La hora de fin debe estar en formato HH:MM.';
    }
    if (data.startTime >= data.endTime) {
        errors.timeRange = 'La hora de inicio debe ser anterior a la hora de fin.';
    }

    return {
        isValid: Object
            .keys(errors)
            .length === 0,
        errors
    };
};

export {validateFormLogin, validateFormRegister};