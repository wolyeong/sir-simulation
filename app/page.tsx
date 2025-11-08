'use client'

import { useState } from 'react'
import SirChart from './components/SirChart'

export default function Page() {
  const [params, setParams] = useState({
    N: 50000000,
    I0: 10,
    R0: 0,
    beta: 0.5,
    gamma: 0.001,
    days: 1000,
    dt: 0.1,
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setParams({ ...params, [name]: parseFloat(value) })
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">SIR 모델 시뮬레이터</h1>
      <div className="flex flex-col gap-3 mb-6">
      {Object.entries(params).map(([key, value]) => {
  // 화면에 보여줄 이름 변환
  const displayName =
    key === 'I0' ? 'I₀' :
    key === 'R0' ? 'R₀' :
    key === 'beta' ? 'β' :
    key === 'gamma' ? 'γ' :
    key // 나머지는 원래 key 그대로 표시

  return (
    <label
      key={key}
      className="flex items-center justify-between border-b py-2"
    >
      <span className="text-sm font-semibold">{displayName} </span>
      <input
        type="number"
        step="any"
        name={key}
        value={value}
        onChange={handleChange}
        className="text-right border px-2 py-1 rounded w-32"
      />
      <br />
    </label>
  )
})}
</div>


      <button
        onClick={() => setSubmitted(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        시뮬레이션 실행
      </button>

      {submitted && <SirChart {...params} />}
    </div>
  )
}
