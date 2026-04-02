#!/usr/bin/env python3
"""
EBMT Handbook 第8版 — HCT 臨床計算工具 v2.0
修訂：修復 GVHD 分級 bug、擴充 Busulfan 劑型、CrCl 極端值警告、
      HCT-CI 容錯、每個工具強制附帶 safety disclaimer

知識截止日期：EBMT Handbook 2024年出版
"""

import json, math
from typing import Optional
from difflib import get_close_matches

_DISCLAIMER = (
    "\n⚕️  本工具輸出僅供臨床參考，不取代醫師/藥師的專業判斷。"
    "\n📅 知識截止：EBMT Handbook 第8版（2024）；新藥/新指引請查閱最新文獻。"
)

# ══════════════════════════════════════════════════
# 1. BSA 計算（Ch.13, 16）
# ══════════════════════════════════════════════════
def calc_bsa(weight_kg: float, height_cm: float, method: str = "dubois") -> float:
    """體表面積計算（DuBois 或 Mosteller）"""
    if method == "dubois":
        bsa = 0.007184 * (weight_kg ** 0.425) * (height_cm ** 0.725)
    elif method == "mosteller":
        bsa = math.sqrt((height_cm * weight_kg) / 3600)
    else:
        raise ValueError("method 須為 'dubois' 或 'mosteller'")
    result = {"BSA": f"{bsa:.2f} m²", "公式": method}
    print(json.dumps(result, ensure_ascii=False, indent=2))
    print("📖 來自 EBMT Handbook 第8版 第 13 章")
    print(_DISCLAIMER)
    return round(bsa, 2)


# ══════════════════════════════════════════════════
# 2. CrCl / eGFR（Ch.11）— Unit C 修訂版
# ══════════════════════════════════════════════════
def calc_crcl(age: int, weight_kg: float, creatinine_mg_dl: float,
              sex: str, use_ckdepi: bool = False) -> dict:
    """
    腎功能計算
    ─ 預設：Cockcroft-Gault
    ─ use_ckdepi=True：CKD-EPI 2021（Cr ≥2.5 或高齡時建議）
    """
    warnings = []
    if creatinine_mg_dl >= 2.5:
        warnings.append("⚠️  Cr ≥2.5：CG 不可靠，建議 use_ckdepi=True")
    if age >= 75:
        warnings.append("⚠️  高齡（≥75歲）：肌肉量少，CG 可能高估 CrCl")
    if weight_kg < 40:
        warnings.append("⚠️  體重 <40kg：請確認使用實際體重")

    if use_ckdepi:
        scr = creatinine_mg_dl
        kappa, alpha, sex_mult = (0.7, -0.241, 1.012) if sex.upper()=="F" else (0.9, -0.302, 1.0)
        ratio = scr / kappa
        egfr = 142 * (ratio**alpha if ratio<1 else ratio**-1.200) * (0.9938**age) * sex_mult
        method, value, unit = "CKD-EPI 2021", egfr, "mL/min/1.73m²（eGFR）"
    else:
        crcl = ((140 - age) * weight_kg) / (72 * creatinine_mg_dl)
        if sex.upper() == "F":
            crcl *= 0.85
        method, value, unit = "Cockcroft-Gault", crcl, "mL/min（CrCl）"

    result = {
        "公式": method,
        "結果": f"{value:.1f} {unit}",
        "移植門檻（≥40）": "✅ 符合" if value >= 40 else "🔴 低於門檻",
        "警告": warnings,
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))
    print("📖 來自 EBMT Handbook 第8版 第 11 章")
    print(_DISCLAIMER)
    return result


# ══════════════════════════════════════════════════
# 3. HCT-CI 評分（Ch.11）— Unit D 修訂版
# ══════════════════════════════════════════════════
HCT_CI_ITEMS = {
    "心律不整": 1,
    "心臟病（中重度，非心律不整）": 1,
    "心臟瓣膜病": 3,
    "消化道病變": 1,
    "糖尿病（需胰島素或口服藥）": 1,
    "腦血管病變（CVA/TIA）": 1,
    "精神疾病（需藥物治療）": 1,
    "肝臟輕度病變（慢性肝炎/肝硬化Child-A）": 1,
    "肥胖（BMI>35）": 1,
    "感染（需持續抗菌治療）": 1,
    "類風濕/結締組織病": 2,
    "消化道潰瘍（需治療）": 2,
    "腎臟中重度病變（Cr>2或透析）": 2,
    "肺臟中重度病變（FEV1/DLCO<66%）": 2,
    "前次實體腫瘤（非皮膚癌）": 3,
    "心臟中重度病變（EF<50%/瓣膜嚴重）": 3,
    "肝臟中重度病變（肝硬化Child-B/C）": 3,
}
_HCI_KEYS = list(HCT_CI_ITEMS.keys())

def hct_ci_score(comorbidities: list) -> dict:
    """HCT-CI（Sorror 2005）評分，含模糊比對與明確錯誤回報"""
    score, breakdown, unrecognized, suggestions = 0, {}, [], {}
    for item in comorbidities:
        if item in HCT_CI_ITEMS:
            s = HCT_CI_ITEMS[item]; breakdown[item] = s; score += s
        else:
            m = get_close_matches(item, _HCI_KEYS, n=1, cutoff=0.5)
            unrecognized.append(item)
            if m:
                suggestions[item] = f"→ 最接近：「{m[0]}」（未計分，請確認）"

    nrm = ["低風險（NRM ~14%）","中風險（NRM ~26%）","高風險（NRM ~41%）"][0 if score==0 else 1 if score<=2 else 2]
    rec = ["✅ 可考慮 MAC","⚠️  考慮 RIC 或個別評估","🔴 建議 RIC/NMA；評估適合性"][0 if score==0 else 1 if score<=2 else 2]

    result = {"HCT-CI 總分": score, "NRM 風險": nrm, "建議": rec, "計分明細": breakdown}
    if unrecognized:
        result["⚠️ 未識別（未計分）"] = unrecognized
    if suggestions:
        result["💡 命名建議"] = suggestions
    result["可用共病清單"] = _HCI_KEYS
    print(json.dumps(result, ensure_ascii=False, indent=2))
    print("📖 來自 EBMT Handbook 第8版 第 11 章（HCT-CI，Sorror 2005）")
    print(_DISCLAIMER)
    return result


# ══════════════════════════════════════════════════
# 4. aGVHD 分期與分級（Ch.43）— Unit A 修訂版
# ══════════════════════════════════════════════════
def grade_acute_gvhd(
    skin_bsa_pct: Optional[float] = None,
    skin_bullae: bool = False,
    bilirubin_mg_dl: Optional[float] = None,
    stool_vol_ml_day: Optional[float] = None,
    has_ileus: bool = False
) -> dict:
    """
    急性 GVHD 分期（Glucksberg / EBMT Ch.43 Table 43.4-43.5）
    新增 skin_bullae 參數（水泡/脫皮 = Stage 4）
    修正邊界值（含等於端點）
    """
    # 皮膚
    if skin_bullae:             ss = 4
    elif skin_bsa_pct is None:  ss = 0
    elif skin_bsa_pct < 25:     ss = 1
    elif skin_bsa_pct <= 50:    ss = 2
    else:                       ss = 3

    # 肝臟
    if bilirubin_mg_dl is None:    ls = 0
    elif bilirubin_mg_dl < 2:      ls = 0
    elif bilirubin_mg_dl <= 3:     ls = 1
    elif bilirubin_mg_dl <= 6:     ls = 2
    elif bilirubin_mg_dl <= 15:    ls = 3
    else:                          ls = 4

    # 腸胃
    if has_ileus:                   gs = 4
    elif stool_vol_ml_day is None:  gs = 0
    elif stool_vol_ml_day <= 500:   gs = 0
    elif stool_vol_ml_day <= 1000:  gs = 1
    elif stool_vol_ml_day <= 1500:  gs = 2
    else:                           gs = 3

    # Overall Grade
    if ss==4 or ls==4 or gs==4:             g = 4
    elif ls>=2 or gs>=2:                    g = 3
    elif ss==3 or ls==1 or gs==1:           g = 2
    elif ss in (1,2) and ls==0 and gs==0:   g = 1
    else:                                   g = 0

    tx = {
        0: "觀察，無需全身治療",
        1: "局部皮膚治療，繼續 CNI，密切觀察",
        2: "Methylprednisolone 2mg/kg/day + 繼續 CNI",
        3: "Methylprednisolone 2mg/kg/day + 繼續 CNI；4–7天評估",
        4: "⚠️ Grade IV — 高劑量類固醇 + 緊急考慮第二線（Ruxolitinib）；ICU 評估",
    }[g]

    result = {
        "皮膚 Stage": ss, "皮膚水泡": skin_bullae,
        "肝臟 Stage": ls, "腸胃 Stage": gs,
        "整體 Grade": g, "建議治療": tx,
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))
    print("📖 來自 EBMT Handbook 第8版 第 43 章（Glucksberg，Table 43.4-43.5）")
    print(_DISCLAIMER)
    return result


# ══════════════════════════════════════════════════
# 5. 幹細胞採集目標量（Ch.16）
# ══════════════════════════════════════════════════
def stem_cell_target(patient_weight_kg: float, transplant_type: str = "auto") -> dict:
    """CD34+ 採集目標量計算"""
    label = "自體移植" if transplant_type=="auto" else "異體移植"
    minimum = (2.0 if transplant_type=="auto" else 4.0) * patient_weight_kg
    optimal = (5.0 if transplant_type=="auto" else 6.0) * patient_weight_kg
    result = {
        "移植類型": label, "受者體重": f"{patient_weight_kg} kg",
        "最低目標": f"{minimum:.0f} ×10⁶ CD34+",
        "最佳目標": f"{optimal:.0f} ×10⁶ CD34+",
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))
    print("📖 來自 EBMT Handbook 第8版 第 16 章")
    print(_DISCLAIMER)
    return result


# ══════════════════════════════════════════════════
# 6. 藥物劑量計算（Ch.13, 26, 49 等）— Unit B 修訂版
# ══════════════════════════════════════════════════
_DRUG_DB = {
    "busulfan_iv_mac":    {"display":"Busulfan IV（MAC）","dose_per_kg":3.2,"unit":"mg/kg/day","days":4,
        "note":"IV MAC：3.2mg/kg/day × 4天。需 TDM，目標 AUC 900–1350 µmol·min。","ch":13},
    "busulfan_oral_mac":  {"display":"Busulfan 口服（MAC）","dose_per_kg":1.0,"unit":"mg/kg/dose QID","days":4,
        "note":"Oral MAC：1mg/kg QID（=4mg/kg/day）× 4天。TDM 困難，濃度變異大。","ch":13},
    "busulfan_iv_ric":    {"display":"Busulfan IV（RIC）","dose_per_kg":0.8,"unit":"mg/kg/dose QID","days":"2–4",
        "note":"RIC Flu-Bu：0.8mg/kg QID IV，依方案2–4天。","ch":13},
    "busulfan_pediatric": {"display":"Busulfan 兒童（IV，weight-band）","dose_per_kg":None,"unit":"weight-band","days":4,
        "note":"兒童 IV Bu（Bartelink dosing）：≤9kg→1.0, 9–16kg→1.2, 16–23kg→1.1, 23–34kg→0.95, >34kg→0.8 mg/kg/dose QID。目標AUC 78–101mg·h/L。","ch":13},
    "fludarabine":        {"display":"Fludarabine","dose_per_m2":30,"unit":"mg/m²/day","days":5,
        "note":"RIC：30mg/m²/day × 5天 IV。","ch":13},
    "cyclophosphamide_ptcy":{"display":"Cyclophosphamide（PTCy）","dose_per_kg":50,"unit":"mg/kg D+3&D+4","days":2,
        "note":"PTCy：50mg/kg/day × 2天（D+3, D+4）。需充足水化 + MESNA。","ch":26},
    "melphalan_140":      {"display":"Melphalan 140（Auto-HCT）","dose_per_m2":140,"unit":"mg/m²（單次）","days":1,
        "note":"Mel-140 標準預處理。CrCl<40 → 考慮 Mel-100。","ch":81},
    "melphalan_100":      {"display":"Melphalan 100（腎功能不全）","dose_per_m2":100,"unit":"mg/m²（單次）","days":1,
        "note":"CrCl 30–40mL/min 或高齡患者替代方案。","ch":81},
    "defibrotide":        {"display":"Defibrotide（SOS/VOD）","dose_per_kg":6.25,"unit":"mg/kg/dose QID（=25mg/kg/day）","days":"≥21天",
        "note":"SOS/VOD 唯一核准藥物。腎功能不影響劑量。輸注60min。","ch":49},
    "mtx_gvhd":           {"display":"Methotrexate（Short MTX，GVHD預防）","dose_per_kg":None,"dose_per_m2":None,
        "fixed":{"D+1":"10mg/m²","D+3":"7mg/m²","D+6":"7mg/m²","D+11":"7mg/m²"},"unit":"mg/m²","days":"4劑",
        "note":"Short MTX：D+1 10mg/m²，D+3/D+6/D+11 7mg/m²。黏膜炎重 → Leucovorin rescue。","ch":26},
}

def drug_dose(drug_key: str, weight_kg: float = None, bsa_m2: float = None) -> dict:
    """
    HCT 藥物劑量計算（v2.0）
    drug_key：busulfan_iv_mac / busulfan_oral_mac / busulfan_iv_ric /
              busulfan_pediatric / fludarabine / cyclophosphamide_ptcy /
              melphalan_140 / melphalan_100 / defibrotide / mtx_gvhd
    """
    if drug_key not in _DRUG_DB:
        print(f"⚠️ 不支援：'{drug_key}'。可用：{list(_DRUG_DB.keys())}")
        return {}
    d = _DRUG_DB[drug_key]
    result = {"藥物": d["display"], "注意事項": d["note"], "療程": d.get("days","-")}
    if d.get("dose_per_kg") and weight_kg:
        result["單次劑量"] = f"{d['dose_per_kg']*weight_kg:.1f} mg  ({d['dose_per_kg']} mg/kg × {weight_kg} kg)"
    if d.get("dose_per_m2") and bsa_m2:
        result["單次劑量"] = f"{d['dose_per_m2']*bsa_m2:.1f} mg  ({d['dose_per_m2']} mg/m² × {bsa_m2} m²)"
    if d.get("fixed"):
        result["固定劑量時間表"] = d["fixed"]
    print(json.dumps(result, ensure_ascii=False, indent=2))
    print(f"📖 來自 EBMT Handbook 第8版 第 {d['ch']} 章")
    print(_DISCLAIMER)
    return result


# ══════════════════════════════════════════════════
# 7. Checklist 輸出
# ══════════════════════════════════════════════════
_CHECKLISTS = {
    "pre-hct": {"phase":"移植前評估","chapter":11,"items":[
        {"category":"疾病狀態","tasks":["疾病分期/MRD確認","細胞遺傳學/NGS panel","適應症確認"]},
        {"category":"器官功能","tasks":["ECHO（LVEF≥45%）","肺功能（FEV1≥50%,DLCO≥40%）","LFT","CrCl≥40","牙科評估"]},
        {"category":"感染篩檢","tasks":["CMV IgG（受者+捐贈者）","EBV/HSV/VZV","HIV/HBV/HCV","梅毒","IGRA結核","Toxo IgG（異體）"]},
        {"category":"HLA/捐贈者","tasks":["病患 10-locus HLA","捐贈者搜尋","捐贈者評估（健康/CMV/ABO）"]},
        {"category":"其他","tasks":["生育保存諮詢","心理評估","知情同意","CVC 置入計畫"]},
    ]},
    "fn": {"phase":"中性球低燒處理","chapter":35,"items":[
        {"step":1,"action":"確認：體溫>38°C，ANC<0.5×10⁹/L"},
        {"step":2,"action":"血培養×2（外周+CVC），尿培養，CXR"},
        {"step":3,"action":"30分鐘內 → Pip/Tazo 4.5g q6-8h 或 Cefepime 2g q8h"},
        {"step":4,"action":"Vancomycin：僅限 CVC 感染/皮膚感染/血流動力學不穩"},
        {"step":5,"action":"48-72h 仍燒 → Micafungin/Caspofungin + GM 抗原 + 胸部CT"},
        {"step":6,"action":"懷疑 CDI → 加 Oral Vancomycin 或 Fidaxomicin"},
    ]},
    "gvhd-acute": {"phase":"急性 GVHD 評估處理","chapter":43,"items":[
        {"step":1,"action":"評估皮膚（BSA%/水泡）、肝（Bilirubin）、腸胃（腹瀉量/腸阻塞）"},
        {"step":2,"action":"排除感染（CMV/Adenovirus/CDI PCR 或培養）"},
        {"step":3,"action":"Grade II–IV → Methylprednisolone 2mg/kg/day"},
        {"step":4,"action":"繼續 CNI（Tacrolimus trough 8–12 ng/mL）"},
        {"step":5,"action":"Day 5–7 評估：CR/PR→緩慢減量；SD 5天或PD 3天→第二線"},
        {"step":6,"action":"類固醇難治第二線：Ruxolitinib 10mg BID（優先）"},
        {"step":7,"action":"腸道 GVHD：低渣飲食、TPN 考慮、Budesonide 局部"},
    ]},
    "sos-vod": {"phase":"SOS/VOD 評估與治療","chapter":49,"items":[
        {"step":1,"action":"EBMT 診斷標準：Bili↑ + (肝腫大/腹水/體重增加>5%) ≥2項"},
        {"step":2,"action":"腹部超音波（肝靜脈血流逆向、腹水）"},
        {"step":3,"action":"排除其他肝臟原因（病毒/藥物）"},
        {"step":4,"action":"嚴重度分級（Mild/Moderate/Severe/Very severe）"},
        {"step":5,"action":"Moderate以上 → 立即 Defibrotide 25mg/kg/day（分4次）"},
        {"step":6,"action":"限制液體入量，利尿劑維持平衡，避免腎毒性藥物"},
        {"step":7,"action":"Defibrotide 療程：≥21天（或至完全緩解）"},
    ]},
    "car-t-crs": {"phase":"CAR-T CRS 處理","chapter":60,"items":[
        {"step":1,"action":"CRS 分級：G1發燒/G2低血壓O2<40%/G3-4昇壓藥O2≥40%"},
        {"step":2,"action":"排除感染（血培養、CMV/EBV PCR）"},
        {"step":3,"action":"G1：支持治療，監測"},
        {"step":4,"action":"G2：Tocilizumab 8mg/kg IV（最大800mg）"},
        {"step":5,"action":"G3-4：Tocilizumab + Dexamethasone 10mg q6h"},
        {"step":6,"action":"ICANS 監測：ICE score；G≥3 → Dexamethasone"},
        {"step":7,"action":"HLH/MAS 懷疑（Ferritin持續↑）→ Anakinra 或 Ruxolitinib"},
    ]},
}

def print_checklist(phase_key: str) -> dict:
    """輸出臨床 Checklist。phase_key: pre-hct / fn / gvhd-acute / sos-vod / car-t-crs"""
    if phase_key not in _CHECKLISTS:
        print(f"可用 checklist：{list(_CHECKLISTS.keys())}")
        return {}
    cl = _CHECKLISTS[phase_key]
    print(f"\n{'='*60}")
    print(f"📋 {cl['phase']} Checklist")
    print(f"📖 來自 EBMT Handbook 第8版 第 {cl['chapter']} 章")
    print('='*60)
    print(json.dumps(cl, ensure_ascii=False, indent=2))
    print(_DISCLAIMER)
    return cl


# ══════════════════════════════════════════════════
# 主程式：範例
# ══════════════════════════════════════════════════
if __name__ == "__main__":
    print("EBMT Handbook 第8版 — HCT 計算工具 v2.0")
    print("="*60)
    print("\n[BSA]"); calc_bsa(65, 168)
    print("\n[CrCl 正常]"); calc_crcl(55,65,1.1,"M")
    print("\n[CrCl 高Cr警告]"); calc_crcl(75,45,3.5,"F")
    print("\n[HCT-CI]"); hct_ci_score(["肺臟中重度病變（FEV1/DLCO<66%）"])
    print("\n[aGVHD 含水泡]"); grade_acute_gvhd(skin_bullae=True, bilirubin_mg_dl=5.0)
    print("\n[Busulfan IV MAC]"); drug_dose("busulfan_iv_mac", weight_kg=65)
    print("\n[Busulfan 兒童]"); drug_dose("busulfan_pediatric")
    print("\n[FN Checklist]"); print_checklist("fn")
