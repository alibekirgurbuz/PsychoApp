import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  testCevaplari: {
    // Örnek yapı:
    // "Depresyon": {
    //   testAdi: "Depresyon",
    //   tamamlandi: false,
    //   cevaplar: {
    //     1: { secilenCevap: 'a', puan: 0 },
    //     2: { secilenCevap: 'b', puan: 1 }
    //   },
    //   toplamPuan: 1,
    //   tarih: "2024-02-23",
    //   gecmisSonuclar: [
    //     { toplamPuan: 1, tarih: "2024-02-23" },
    //     { toplamPuan: 2, tarih: "2024-02-22" }
    //   ]
    // }
  }
};

const testSonuclariSlice = createSlice({
  name: 'testSonuclari',
  initialState,
  reducers: {
    cevapKaydet: (state, action) => {
      const { testAdi, soruNumarasi, cevap } = action.payload;
      
      // Eğer test ilk defa başlatılıyorsa, test için yeni bir nesne oluştur
      if (!state.testCevaplari[testAdi]) {
        state.testCevaplari[testAdi] = {
          testAdi,
          tamamlandi: false,
          cevaplar: {},
          toplamPuan: 0,
          tarih: new Date().toISOString().split('T')[0],
          gecmisSonuclar: []
        };
      }

      // Cevabı kaydet
      state.testCevaplari[testAdi].cevaplar[soruNumarasi] = {
        secilenCevap: cevap.id,
        puan: cevap.value
      };

      // Toplam puanı güncelle
      state.testCevaplari[testAdi].toplamPuan = Object.values(
        state.testCevaplari[testAdi].cevaplar
      ).reduce((toplam, cevap) => toplam + cevap.puan, 0);
    },

    testiTamamla: (state, action) => {
      const { testAdi } = action.payload;
      if (state.testCevaplari[testAdi]) {
        const test = state.testCevaplari[testAdi];
        const yeniSonuc = {
          toplamPuan: test.toplamPuan,
          tarih: test.tarih
        };

        // Geçmiş sonuçlara ekle
        test.gecmisSonuclar.push(yeniSonuc);
        
        // Tarihe göre sırala
        test.gecmisSonuclar.sort((a, b) => new Date(b.tarih) - new Date(a.tarih));

        test.tamamlandi = true;
      }
    },

    testiSifirla: (state, action) => {
      const { testAdi } = action.payload;
      if (state.testCevaplari[testAdi]) {
        const gecmisSonuclar = state.testCevaplari[testAdi].gecmisSonuclar;
        state.testCevaplari[testAdi] = {
          testAdi,
          tamamlandi: false,
          cevaplar: {},
          toplamPuan: 0,
          tarih: new Date().toISOString().split('T')[0],
          gecmisSonuclar
        };
      }
    }
  }
});

export const { cevapKaydet, testiTamamla, testiSifirla } = testSonuclariSlice.actions;

// Seçiciler (Selectors)
export const selectTestCevaplari = (state, testAdi) => state.testSonuclari.testCevaplari[testAdi];
export const selectTestinTamamlanmaDurumu = (state, testAdi) => 
  state.testSonuclari.testCevaplari[testAdi]?.tamamlandi || false;
export const selectSoruCevabi = (state, testAdi, soruNumarasi) => 
  state.testSonuclari.testCevaplari[testAdi]?.cevaplar[soruNumarasi];
export const selectToplamPuan = (state, testAdi) => 
  state.testSonuclari.testCevaplari[testAdi]?.toplamPuan || 0;
export const selectGecmisSonuclar = (state, testAdi) =>
  state.testSonuclari.testCevaplari[testAdi]?.gecmisSonuclar || [];

export default testSonuclariSlice.reducer; 