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
                    props.setTrigger(false);
                    const model_input = (document.getElementsByClassName('model-input')[0] as HTMLInputElement).value
                    const brand_input = (document.getElementsByClassName('brand-input')[0] as HTMLInputElement).value
                    const chassis_input = (document.getElementsByClassName('chassis-input')[0] as HTMLInputElement).value
                    const condition_input = (document.getElementsByClassName('condition-input')[0] as HTMLInputElement).value
                    const status_input = (document.getElementsByClassName('status-input')[0] as HTMLInputElement).value
                    const price_input = (document.getElementsByClassName('price-input')[0] as HTMLInputElement).value

                    const carData = {
                        model: model_input,
                        brand: brand_input,
                        chassisNumber: parseInt(chassis_input),
                        condition: condition_input,
                        status: status_input,
                        price: parseInt(price_input)
                    };
                    if(model_input!== "" && brand_input!== null&&chassis_input!== null&&condition_input!== null&&status_input!== null&&price_input!== null){
                        CarService.addCar(carData);
                    }
                    
                    }
                }>Yes</button>
                <button className="no-btn" onClick={()=>props.setTrigger(false)}>NO</button>
                
            </div>
        </div>
    ) : null;

}

export default PopUp