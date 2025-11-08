'use client'

import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from 'chart.js'


ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip)

interface Props {
  N: number
  I0: number
  R0: number
  beta: number
  gamma: number
  days: number
  dt: number
}

export default function SirChart({ N, I0, R0, beta, gamma, days, dt }: Props) {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const S = [N - I0 - R0]
    const I = [I0]
    const R = [R0]
    const t = [0]

    for (let i = 0; i < days / dt; i++) {
      const S_new = S[S.length - 1] - (beta * S[S.length - 1] * I[I.length - 1]) / N * dt
      const I_new =
        I[I.length - 1] +
        ((beta * S[S.length - 1] * I[I.length - 1]) / N - gamma * I[I.length - 1]) * dt
      const R_new = R[R.length - 1] + gamma * I[I.length - 1] * dt

      S.push(S_new)
      I.push(I_new)
      R.push(R_new)
      t.push(t[t.length - 1] + dt)
    }

    setData({
      labels: t.map((v) => v.toFixed(1)),
      datasets: [
        {
          label: 'Susceptible',
          data: S,
          borderColor: 'rgb(75, 192, 192)',
          fill: false,
        },
        {
          label: 'Infected',
          data: I,
          borderColor: 'rgb(255, 99, 132)',
          fill: false,
        },
        {
          label: 'Recovered',
          data: R,
          borderColor: 'rgb(54, 162, 235)',
          fill: false,
        },
      ],
    })
  }, [N, I0, R0, beta, gamma, days, dt])

  if (!data) return <p className="mt-6">계산 중...</p>

  return (
    <div className="mt-8" style={{ width: '2000px', height: '1000px' }}>
      <Line
        data={data}
        options={{
          responsive: true,
          plugins: { 
            legend: { 
              position: 'top' as const,
              labels: {
                font: {
                  family: 'var(--font-noto-serif), Times New Roman, Times, serif',
                }
              }
            } 
          },
          scales: {
            x: { 
              title: { 
                display: true, 
                text: 'Days',
                font: {
                  family: 'var(--font-noto-serif), Times New Roman, Times, serif',
                }
              },
              ticks: {
                font: {
                  family: 'var(--font-noto-serif), Times New Roman, Times, serif',
                }
              }
            },
            y: { 
              title: { 
                display: true, 
                text: 'Population',
                font: {
                  family: 'var(--font-noto-serif), Times New Roman, Times, serif',
                }
              },
              ticks: {
                font: {
                  family: 'var(--font-noto-serif), Times New Roman, Times, serif',
                },
                stepSize: 1000000,
              }
            },
          },
        }}
      />
    </div>
  )
}
