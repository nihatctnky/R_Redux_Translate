
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';


// dil verilerini alma
export const getLanguages = createAsyncThunk(
    "language/getLanguages",
    async () => {
        //  api istek at
        const res = await api.get("/getLanguages");
        // fulfilled aksiyonun payloadı belirle
        return res.data.data.languages;
    }
)

// apiden çeviri sonucu al

export const translateText = createAsyncThunk("translate/translateText",
    async (arg, { getState }) => {

        // store tutulan state eriş

        const { translate } = getState();

        // api gönderilcek parametreyi al
        const params = new URLSearchParams();
        params.set("source_language", translate.sourceLang.value);

        params.set("target_language", translate.targetLang.value);

        params.set("text", translate.textToTranslate);

        // apiye istek at
        const res = await api.post("translate", params);

        // aksiyonun payloadı belirle
        return res.data.data.translatedText;
    }

)