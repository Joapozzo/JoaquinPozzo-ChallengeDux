import { Dropdown } from "primereact/dropdown"

interface SelectFilterProps {
    options: { label: string; value: string }[];
    placeholder: string;
    onChange: (value: string) => void;
    value: string;
    disabled?: boolean;
}

const SelectFilter = ({ options, placeholder, onChange, value, disabled }: SelectFilterProps) => {
    return (
        <div className="flex-1 relative">
            <i className="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10 pointer-events-none" />
            <Dropdown 
                placeholder={placeholder} 
                className="w-full pl-7" 
                options={options} 
                onChange={(e) => onChange(e.value)}
                value={value}
                disabled={disabled}
            />
        </div>
    )
}

export default SelectFilter