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
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-2xl font-bold">SIR 모델 시뮬레이터</h1>
      <div className="mb-6 flex flex-col gap-3">
        {Object.entries(params).map(([key, value]) => {
          // 화면에 보여줄 이름 변환
          const displayName =
            key === 'I0' ? 'I₀' : key === 'R0' ? 'R₀' : key === 'beta' ? 'β' : key === 'gamma' ? 'γ' : key // 나머지는 원래 key 그대로 표시

          return (
            <label key={key} className="flex items-center justify-between border-b py-2">
              <span className="text-sm font-semibold">{displayName} </span>
              <input
                type="number"
                step="any"
                name={key}
                value={value}
                onChange={handleChange}
                className="w-32 rounded border px-2 py-1 text-right"
              />
              <br />
            </label>
          )
        })}
      </div>
      <br />
      <button
        onClick={() => setSubmitted(true)}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        style={{ width: '300px', height: '60px' }}
      >
        시뮬레이션 실행
      </button>

      {submitted && <SirChart {...params} />}
    </div>
  )
}
