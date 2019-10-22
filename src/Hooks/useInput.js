import { useState } from "react";
export default ( defaultVlue ) => {
    const [value, setValue] = useState(defaultVlue);

    const onChange = (e) => {
        const { target: {value} } = e;
        setValue(value);
    }

    return { value, onChange };
}