import React, { useState, useEffect, useContext } from 'react';
import { CheckCircle, User, Speech, School, BadgeCheck } from 'lucide-react'; // 아이콘
import { Link } from 'react-router-dom';
import { VisitorContext } from './VisitorContext'; // Context 추가

const SetStatus = () => {
  const [selectedStatus, setSelectedStatus] = useState('Active');
  const [vipInfo, setVipInfo] = useState(''); // VIP 추가 정보를 위한 state
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  const { addVisitor } = useContext(VisitorContext); // addVisitor 함수 가져오기

  // 매초마다 시간을 업데이트하는 useEffect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 제거
  }, []);

  const statuses = [
    {
      label: '방문',
      icon: <User />,
    },
    {
      label: '설명',
      icon: <Speech />,
    },
    {
      label: '교사인증',
      icon: <School />,
    },
    {
      label: 'VIP',
      icon: <BadgeCheck />,
    },
  ];

  // 기록하기 버튼을 눌렀을 때 실행되는 함수
  const handleSave = () => {
    addVisitor(selectedStatus, selectedStatus === 'VIP' ? vipInfo : '');

    // 저장 완료 메시지나 다른 처리
    alert('방문 기록이 저장되었습니다.');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl">
      <h1 className="text-center text-2xl font-bold mb-6">실시간 방문객</h1>
      <h2 className="text-center text-md mb-4">{currentTime}</h2>

      <div className="space-y-4">
        {statuses.map((status) => (
          <div
            key={status.label}
            className={`flex items-center justify-between p-4 rounded-lg min-h-[80px] ${
              selectedStatus === status.label ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'
            } cursor-pointer`}
            onClick={() => setSelectedStatus(status.label)}
          >
            <div className="flex items-center">
              <span className="mr-4">{status.icon}</span>
              <p className="font-semibold">{status.label}</p>
            </div>
            <div>
              {selectedStatus === status.label ? (
                <CheckCircle className="text-white" />
              ) : (
                <div className="w-6 h-6 border-2 rounded-full border-gray-400"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* VIP 상태일 때만 input 필드가 나타남 */}
      {selectedStatus === 'VIP' && (
        <div className="mt-4">
          <label htmlFor="vip-info" className="block text-sm font-medium text-gray-700">
            VIP 추가 정보
          </label>
          <input
            id="vip-info"
            type="text"
            value={vipInfo}
            onChange={(e) => setVipInfo(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="VIP에 대한 추가 정보를 입력하세요"
          />
        </div>
      )}

      <button className="w-full bg-gray-900 text-white py-3 mt-6 rounded-lg font-semibold" onClick={handleSave}>
        기록
      </button>

      <Link to="/visitors" className="block text-center mt-6 text-blue-600">
        방문객 통계 보기
      </Link>
    </div>
  );
};

export default SetStatus;
