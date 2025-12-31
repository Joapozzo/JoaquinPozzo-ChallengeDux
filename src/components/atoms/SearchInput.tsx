import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    disabled?: boolean;
}

const SearchInput = ({ value, onChange, placeholder, disabled }: SearchInputProps) => {
    return (
        <div className="flex-1 w-full">
            <IconField iconPosition="left" className="w-full">
                <InputIcon className="pi pi-search" />
                <InputText
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                    className="w-full"
                />
            </IconField>
        </div>
    );
};

export default SearchInput