import CarService from "@services/CarService";

const PopUp: React.FC<{ trigger: boolean, setTrigger: (value: boolean) => void, children: React.ReactNode; }> = (props) => {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <div>
                    <input type="text" placeholder="Model" className="model-input" />
                    <input type="text" placeholder="brand" className="brand-input"/>
                    <input type="text" placeholder="chassis Number" className="chassis-input" />
                    <input type="text" placeholder="condition" className="condition-input"/>
                    <input type="text" placeholder="status" className="status-input"/>
                    <input type="text" placeholder="price" className="price-input"/>
                </div>
                { props.children }
                <button className="yes-btn" onClick={async()=> {
                    const model_input = (document.getElementsByClassName('model-input')[0] as HTMLInputElement).value.trim()
                    const brand_input = (document.getElementsByClassName('brand-input')[0] as HTMLInputElement).value.trim()
                    const chassis_input = (document.getElementsByClassName('chassis-input')[0] as HTMLInputElement).value.trim()
                    const condition_input = (document.getElementsByClassName('condition-input')[0] as HTMLInputElement).value.trim()
                    const status_input = (document.getElementsByClassName('status-input')[0] as HTMLInputElement).value.trim()
                    const price_input = (document.getElementsByClassName('price-input')[0] as HTMLInputElement).value.trim()

                    //form validation
                    if (!model_input || !brand_input || !chassis_input || !condition_input || !status_input || !price_input) {
                        alert('Please fill in all fields');
                        return;
                    }

                    // make suure price is a number
                    if (isNaN(Number(price_input))) {
                        alert('Price must be a valid number');
                        return;
                    }

                    const carData = {
                        model: model_input,
                        brand: brand_input,
                        chassisNumber: parseInt(chassis_input),
                        condition: condition_input,
                        status: status_input,
                        price: parseInt(price_input)
                    };
                    
                    await CarService.addCar(carData);
                    props.setTrigger(false);
                }}>Yes</button>
                <button className="no-btn" onClick={()=>props.setTrigger(false)}>NO</button>
                
            </div>
        </div>
    ) : null;
}

export default PopUp