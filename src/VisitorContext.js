import React, { createContext, useState } from 'react';

export const VisitorContext = createContext();

export const VisitorProvider = ({ children }) => {
  const [visitors, setVisitors] = useState([]);
  const [promotionalMaterials, setPromotionalMaterials] = useState({
    pamphlets: 500,
    flyers: 500,
  });
  const [souvenirs, setSouvenirs] = useState(500);
  const [coupons, setCoupons] = useState(500);

  const addVisitor = (status, info) => {
    const newVisitor = {
      status,
      info,
      date: new Date().toISOString(),
    };
    setVisitors([...visitors, newVisitor]);
    
    // 홍보물 감소 로직
    if (status === '방문' || status === '설명') {
      setPromotionalMaterials((prev) => ({
        ...prev,
        pamphlets: Math.max(0, prev.pamphlets - 1),
        flyers: Math.max(0, prev.flyers - 1),
      }));
    } else if (status === '교사인증') {
      setSouvenirs((prev) => Math.max(0, prev - 1));
      setCoupons((prev) => Math.max(0, prev - 1));
    }
  };

  return (
    <VisitorContext.Provider value={{ visitors, addVisitor, promotionalMaterials, souvenirs, coupons }}>
      {children}
    </VisitorContext.Provider>
  );
};
