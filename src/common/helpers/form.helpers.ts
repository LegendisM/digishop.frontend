export const JsonToFormData = (json: any): FormData => {
    const formData = new FormData();

    for (const key in json) {
        if (json.hasOwnProperty(key)) {
            const value = json[key];

            if (value instanceof File || value instanceof Blob) {
                formData.append(key, value, value.name);
            } else {
                formData.append(key, value);
            }
        }
    }

    return formData;
}