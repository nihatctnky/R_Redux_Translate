import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { changeLangs, setSource, setTarget } from "../redux/slices/translateSlice";
import { useMemo } from "react";
import { translateText } from "../redux/actions";

const LanguageSelect = () => {

    const { isLoading, languages } = useSelector((store) => store.language)

    const { sourceLang, targetLang } = useSelector((store) => store.translate)


    const dispatch = useDispatch();

    // languages dizzisindeki bütün nesneleri 
    // code>value  name>label çevirmeliyiz
    // her render sırasında gereksiz yere hesaplama yapıyoruz

    const formatted = useMemo(
        () =>
            languages.map((item) => ({
                value: item.code,
                label: item.name,
            })),
        [languages]
    );

    return (
        <div className="flex gap-2 text-black">
            <Select
                value={sourceLang}
                options={formatted}
                isLoading={isLoading}
                isDisabled={isLoading}
                onChange={(selected) => {

                    if (selected.value === targetLang.value)
                        return dispatch(changeLangs());

                    dispatch(setSource(selected));
                }}
                className="flex-1" />

            <button onClick={() => dispatch(changeLangs())} className="bg-zinc-700 py-2 px-6 hover:bg-zinc-800 transition rounded text-white">Degiş</button>


            <Select
                value={targetLang}
                options={formatted}
                isLoading={isLoading}
                isDisabled={isLoading}
                onChange={(selected) => {
                    // eger şecilen dil hedef dilse fonsiyonu durdur
                    if (targetLang.value === selected.value) return;


                    // eger seçilen dil kaynak dilile aynı ile yer degiştir
                    if (sourceLang.value === selected.value)
                        return dispatch(changeLangs());

                    dispatch(setTarget(selected))
                    dispatch(translateText());

                }}
                className="flex-1" />
        </div>
    )
}

export default LanguageSelect