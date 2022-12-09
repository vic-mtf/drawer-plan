import { useMode } from "../../utils/mode";
import options from "./options";
import style from '../../styles/Header.module.css';


export default function Headers () {
    const [mode, setMode] = useMode();
    const handleChangeMode = mode => () => setMode(mode);
    return (
        <div className={style.Header}>
            {options.map( btn => (
                <button 
                    className={btn.mode === mode ? style.ActiveButton : ''}
                    key={btn.mode}
                    onClick={handleChangeMode(btn.mode)}
                >{btn.label}</button>
            ))}
        </div>
    )

}