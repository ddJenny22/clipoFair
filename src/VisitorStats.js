import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { VisitorContext } from './VisitorContext'; 
import { Newspaper } from 'lucide-react'; 
import { format } from 'date-fns';

const Dashboard = () => {
  const { visitors, promotionalMaterials, souvenirs, coupons } = useContext(VisitorContext); 

  const stats = visitors.reduce(
    (acc, visitor) => {
      acc.total++;
      if (visitor.status === '방문') acc.justVisited++;
      if (visitor.status === '설명') acc.explained++;
      if (visitor.status === '교사인증') acc.teacher++;
      if (visitor.status === 'VIP') acc.vip++;
      return acc;
    },
    { total: 0, explained: 0, justVisited: 0, vip: 0 }
  );

  const chartData = [
    { name: '방문', value: stats.justVisited },
    { name: '설명', value: stats.explained },
    { name: '교사인증', value: stats.teacher },
    { name: 'VIP', value: stats.vip },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <div className="col-span-2 bg-ivory p-6 rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-8">방문객 통계</h1>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">총 방문자 수</h2>
          <span className="bg-green-200 text-green-800 text-sm font-medium px-2 py-1 rounded-lg">
            목표 : 300
          </span>
        </div>
        <p className="text-4xl font-bold text-green-900 mb-6">{stats.total} 명</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg" style={{ height: '300px' }}>
            <h3 className="text-md font-semibold mb-2">일별 방문자</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-lg" style={{ height: '300px' }}>
            <h3 className="text-md font-semibold mb-2">방문자 유형</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4a90e2" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="col-span-1 bg-ivory p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-8">홍보물 및 쿠폰 관리</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div
              className={`p-6 rounded-lg ${promotionalMaterials.pamphlets <= 100 ? 'border- border-red-500' : 'bg-bg'}`}
              style={promotionalMaterials.pamphlets <= 100 ? { border: '3px solid red' } : {}}
            >
<div className="flex flex-col items-start mb-4"> 
  <div className="bg-purple-200 rounded-full p-2 mb-2"> 
    <Newspaper className="text-purple-800" />
  </div>
  <h2 className="text-lg font-semibold">남은 팜플렛 수</h2>
</div>

              <p className={`text-4xl font-bold ${promotionalMaterials.pamphlets <= 100 ? 'text-red-900' : 'text-purple-900'}`}>
                {promotionalMaterials.pamphlets} 개
              </p>
            </div>

            <div
              className={`p-6 rounded-lg ${promotionalMaterials.flyers <= 100 ? 'border-3 border-red-500' : 'bg-bg'}`}
              style={promotionalMaterials.flyers <= 100 ? { border: '3px solid red' } : {}}
            >
<div className="flex flex-col items-start mb-4"> 
  <div className="bg-purple-200 rounded-full p-2 mb-2"> 
    <Newspaper className="text-purple-800" />
  </div>
  <h2 className="text-lg font-semibold">남은 전단지 수</h2>
</div>
              <p className={`text-4xl font-bold ${promotionalMaterials.flyers <= 100 ? 'text-red-900' : 'text-purple-900'}`}>
                {promotionalMaterials.flyers} 개
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div
              className={`p-6 rounded-lg ${souvenirs <= 100 ? 'border-3 border-red-500' : 'bg-bg'}`}
              style={souvenirs <= 100 ? { border: '3px solid red' } : {}}
            >
<div className="flex flex-col items-start mb-4"> 
  <div className="bg-brown rounded-full p-2 mb-2"> 
    <Newspaper className="text-sblue" />
  </div>
  <h2 className="text-lg font-semibold">남은 기념품 수</h2>
</div>

              <p className={`text-4xl font-bold ${souvenirs <= 100 ? 'text-red-900' : 'text-brown'}`}>
                {souvenirs} 개
              </p>
            </div>

            <div
              className={`p-6 rounded-lg ${coupons <= 100 ? 'border-6 border-red-500' : 'bg-bg'}`}
              style={coupons <= 100 ? { border: '6px solid red' } : {}}
            >
<div className="flex flex-col items-start mb-4"> 
  <div className="bg-purple-200 rounded-full p-2 mb-2"> 
    <Newspaper className="text-purple-800" />
  </div>
  <h2 className="text-lg font-semibold">남은 쿠폰 수</h2>
</div>
              <p className={`text-4xl font-bold ${coupons <= 100 ? 'text-red-900' : 'text-navy'}`}>
                {coupons} 개
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
