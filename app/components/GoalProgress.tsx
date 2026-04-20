"use client";

interface GoalProps {
  target?: number;
  current?: number;
}

export default function GoalProgress({ target = 1000, current = 0 }: GoalProps) {
  const percentage = Math.min(Math.round((current / target) * 100), 100);

  return (
    <div className="card" style={{ padding: 24, background: 'rgba(245, 166, 35, 0.03)', border: '1px solid rgba(245, 166, 35, 0.2)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
        <div>
          <h4 style={{ fontSize: 13, fontWeight: 800, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
            Meta Mensal do Servidor
          </h4>
          <p style={{ fontSize: 13, color: 'var(--muted)' }}>
            Ajude-nos a manter o servidor online e receba recompensas globais!
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
           <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 2 }}>Progresso</div>
           <div style={{ fontSize: 24, fontWeight: 900, color: '#fff', fontFamily: 'var(--font-display)' }}>
             {percentage}%
           </div>
        </div>
      </div>
      
      <div className="progress-bar" style={{ height: 10 }}>
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase' }}>
        <span>R$ {current.toFixed(2)} acumulados</span>
        <span>Meta: R$ {target.toFixed(2)}</span>
      </div>
    </div>
  );
}
