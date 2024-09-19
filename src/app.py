import streamlit as st
import pandas as pd

# 가상의 데이터 생성
data = {
    'Timestamp': pd.date_range(start='2024-01-01', periods=10, freq='D'),
    'Visitor Type': ['explained', 'justVisited', 'vip', 'explained', 'vip', 'justVisited', 'explained', 'vip', 'justVisited', 'explained']
}

df = pd.DataFrame(data)

st.title('전체 방문자 데이터')

st.write('방문자 데이터의 전체 보기:')
st.dataframe(df)

# 추가적으로 필요한 분석이나 시각화를 여기에 추가할 수 있습니다
