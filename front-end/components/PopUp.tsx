
const PopUp: React.FC<{ trigger: boolean, setTrigger: (value: boolean) => void, children: React.ReactNode; }> = (props) => {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="yes-btn" onClick={()=> props.setTrigger(false)}>Yes</button>
                { props.children }
            </div>
        </div>
    ) : null;

}

export default PopUp