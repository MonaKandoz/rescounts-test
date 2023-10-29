import './form-input.styles.css';

const FormInput = ({ label, ...otherProps }) => {
    const {required, type}  = otherProps;
    
  return (
    <div className="field">
      {type !== "radio" && (
        <label className={required ? "required" : ""}>{label}</label>
      )}
      <input {...otherProps} />
      {type === "radio" && <label>{label}</label>}
      
    </div>
  );
};

export default FormInput;