import {
  Activity,
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Clock3,
  FileText,
  Flag,
  Gauge,
  Globe,
  Layers3,
  Network,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const basePath = process.env.NODE_ENV === "production" ? "/geoprix-motorsport" : "";

const navigation = [
  { label: "Visão geral", icon: Gauge, href: "#overview" },
  { label: "Pirâmide", icon: Layers3, href: "#pyramid" },
  { label: "Campeonatos", icon: Trophy, href: "#championships" },
  { label: "Gestão automática", icon: Network, href: "#automation" },
  { label: "Relatórios", icon: FileText, href: "#reports" },
];

const levels = [
  { number: "08", title: "Elite mundial", subtitle: "O topo do automobilismo de monopostos", width: "42%" },
  { number: "07", title: "Internacional", subtitle: "Disputa entre os principais talentos", width: "50%" },
  { number: "06", title: "Continental", subtitle: "Campeonatos de alcance continental", width: "58%" },
  { number: "05", title: "Regional avançada", subtitle: "Integração entre países e regiões", width: "66%" },
  { number: "04", title: "Regional", subtitle: "Desenvolvimento e preparação", width: "74%" },
  { number: "03", title: "Nacional avançada", subtitle: "Etapa superior dos campeonatos nacionais", width: "82%" },
  { number: "02", title: "Nacional", subtitle: "Campeonatos padronizados em vários países", width: "90%" },
  { number: "01", title: "Iniciação", subtitle: "Primeiros passos na formação em monopostos", width: "98%" },
];

const principles = [
  { icon: Flag, title: "Você realiza as corridas", text: "Os resultados esportivos são definidos por você no GeoPrix e registrados no GEOPRIX." },
  { icon: Activity, title: "O sistema administra", text: "Classificações, estatísticas e registros são atualizados a partir dos resultados informados." },
  { icon: Clock3, title: "Mudanças no encerramento", text: "Contratos, mercado, transferências e demais decisões administrativas são processados para a temporada seguinte." },
];

export default function Home() {
  return (
    <main className="gx-shell" id="overview">
      <aside className="gx-sidebar">
        <a className="gx-brand" href={basePath + "/"}>
          <span className="gx-brand-mark"><Gauge size={22} strokeWidth={2.4} /></span>
          <span className="gx-brand-word">GEOPRIX<span>WORLD MOTORSPORT</span></span>
        </a>
        <div className="gx-nav-caption">CENTRAL DO UNIVERSO</div>
        <nav className="gx-nav">
          {navigation.map(({ label, icon: Icon, href }, index) => (
            <a className={index === 0 ? "gx-nav-link active" : "gx-nav-link"} href={href} key={label}>
              <Icon size={17} /><span>{label}</span>{index === 0 ? <span className="gx-nav-indicator" /> : null}
            </a>
          ))}
        </nav>
        <div className="gx-sidebar-bottom">
          <div className="gx-sidebar-status"><span className="gx-status-dot" /> PROJETO EM CONSTRUÇÃO</div>
          <div className="gx-sidebar-note">Um universo. Várias categorias. Uma única estrutura.</div>
          <div className="gx-version">GEOPRIX · NOVA FASE</div>
        </div>
      </aside>

      <section className="gx-main">
        <header className="gx-topbar">
          <div className="gx-breadcrumb"><span>GEOPRIX</span><ChevronRight size={13} /><b>Visão geral</b></div>
          <div className="gx-topbar-right"><span className="gx-season-pill"><span /> UNIVERSO EM PLANEJAMENTO</span><div className="gx-avatar">G</div></div>
        </header>

        <div className="gx-content">
          <section className="gx-hero">
            <div className="gx-hero-copy">
              <div className="gx-kicker"><span /> WORLD MOTORSPORT MANAGEMENT</div>
              <h1>O automobilismo.<br /><em>Um universo inteiro.</em></h1>
              <p>Uma plataforma para administrar um ecossistema mundial de monopostos, conectando pilotos, equipes, campeonatos e temporadas.</p>
              <a className="gx-primary-button" href="#pyramid">Explorar a estrutura <ArrowUpRight size={16} /></a>
            </div>
            <div className="gx-hero-art" aria-hidden="true">
              <div className="gx-orbit gx-orbit-one" /><div className="gx-orbit gx-orbit-two" />
              <div className="gx-art-center"><Gauge size={66} strokeWidth={1.15} /><span>GPX</span></div>
              <div className="gx-art-label gx-art-label-one"><span>01</span> GLOBAL</div>
              <div className="gx-art-label gx-art-label-two"><span>∞</span> CONNECTED</div>
              <div className="gx-art-cross gx-art-cross-one" /><div className="gx-art-cross gx-art-cross-two" />
            </div>
            <div className="gx-hero-index">01 <span>/</span> 05</div>
          </section>

          <section className="gx-stat-grid" aria-label="Princípios do projeto">
            <article className="gx-stat-card"><div className="gx-stat-icon"><Flag size={17} /></div><span>MODALIDADE INICIAL</span><b>Monopostos</b><small>Foco exclusivo nesta fase</small></article>
            <article className="gx-stat-card"><div className="gx-stat-icon"><Users size={17} /></div><span>RESULTADOS</span><b>Você define</b><small>O sistema processa os dados</small></article>
            <article className="gx-stat-card"><div className="gx-stat-icon"><Network size={17} /></div><span>ADMINISTRAÇÃO</span><b>Automática</b><small>Decisões no fim da temporada</small></article>
            <article className="gx-stat-card"><div className="gx-stat-icon"><Globe size={17} /></div><span>ABRANGÊNCIA</span><b>Mundial</b><small>Campeonatos em vários países</small></article>
          </section>

          <section className="gx-section" id="pyramid">
            <div className="gx-section-heading">
              <div><div className="gx-kicker">ESTRUTURA ESPORTIVA</div><h2>Uma pirâmide. <em>Muitos caminhos.</em></h2><p>A arquitetura inicial do universo de monopostos.</p></div>
              <span className="gx-outline-tag"><Sparkles size={13} /> ESTRUTURA PROVISÓRIA</span>
            </div>
            <div className="gx-pyramid-layout">
              <div className="gx-pyramid">
                {levels.map((level, index) => (
                  <div className="gx-level-wrap" key={level.number}>
                    <div className={"gx-level gx-level-" + index} style={{ width: level.width }}>
                      <span className="gx-level-number">{level.number}</span>
                      <span className="gx-level-title">{level.title}</span>
                      <span className="gx-level-subtitle">{level.subtitle}</span>
                    </div>
                  </div>
                ))}
                <div className="gx-pyramid-base"><span /> BASE DE FORMAÇÃO · MONOPOSTOS <span /></div>
              </div>
              <aside className="gx-base-detail">
                <div className="gx-detail-icon"><Globe size={20} /></div>
                <div className="gx-kicker">PRIMEIRA DIRETRIZ DEFINIDA</div>
                <h3>Campeonatos nacionais em vários países.</h3>
                <p>A base terá competições nacionais independentes, seguindo o mesmo padrão técnico e esportivo.</p>
                <ul>
                  <li><CheckCircle2 size={15} /> Mesmo modelo de monoposto</li>
                  <li><CheckCircle2 size={15} /> Regulamento padronizado</li>
                  <li><CheckCircle2 size={15} /> Mesmo nível técnico</li>
                  <li><CheckCircle2 size={15} /> Pontuação equivalente</li>
                </ul>
                <span className="gx-detail-footnote">Países participantes serão definidos no planejamento.</span>
              </aside>
            </div>
            <div className="gx-pyramid-disclaimer"><CircleDot size={13} /> Os níveis e nomes acima são uma proposta visual de trabalho. A pirâmide definitiva será construída em conjunto.</div>
          </section>

          <section className="gx-section gx-championship-section" id="championships">
            <div className="gx-section-heading">
              <div><div className="gx-kicker">UNIVERSO CONECTADO</div><h2>Campeonatos por todo o mundo.</h2><p>Uma estrutura global, organizada por níveis e regiões.</p></div>
            </div>
            <div className="gx-region-grid">
              {[
                { name: "Europa", code: "EU", desc: "Campeonatos nacionais e continentais" },
                { name: "Américas", code: "AM", desc: "América do Norte, Central e do Sul" },
                { name: "Ásia", code: "AS", desc: "Mercados nacionais e regionais" },
                { name: "Oceania", code: "OC", desc: "Competições nacionais e regionais" },
                { name: "África", code: "AF", desc: "Desenvolvimento de novos campeonatos" },
              ].map((region) => (
                <article className="gx-region-card" key={region.code}><span>{region.code}</span><div><b>{region.name}</b><small>{region.desc}</small></div><ArrowUpRight size={15} /></article>
              ))}
            </div>
          </section>

          <section className="gx-section" id="automation">
            <div className="gx-section-heading">
              <div><div className="gx-kicker">CICLO DE TEMPORADA</div><h2>Você corre. O universo evolui.</h2><p>O processamento administrativo acontece somente quando a temporada é encerrada.</p></div>
            </div>
            <div className="gx-cycle">
              <article><span className="gx-cycle-number">01</span><CalendarDays size={21} /><b>Temporada em andamento</b><p>Você realiza as corridas e registra os resultados.</p></article>
              <div className="gx-cycle-arrow"><ArrowDown size={18} /></div>
              <article className="gx-cycle-trigger"><span className="gx-cycle-number">02</span><ShieldCheck size={21} /><b>Encerrar temporada</b><p>O único comando para iniciar o processamento global.</p><span className="gx-trigger-label">AÇÃO DO USUÁRIO</span></article>
              <div className="gx-cycle-arrow"><ArrowDown size={18} /></div>
              <article><span className="gx-cycle-number">03</span><Activity size={21} /><b>Gestão automática</b><p>Contratos, mercado, transferências e movimentações.</p></article>
              <div className="gx-cycle-arrow"><ArrowDown size={18} /></div>
              <article><span className="gx-cycle-number">04</span><FileText size={21} /><b>Relatório final</b><p>Resumo das decisões e preparação da próxima temporada.</p></article>
            </div>
          </section>

          <section className="gx-section gx-principles-section" id="reports">
            <div className="gx-section-heading"><div><div className="gx-kicker">FILOSOFIA DO GEOPRIX</div><h2>Um sistema que trabalha nos bastidores.</h2></div></div>
            <div className="gx-principle-grid">
              {principles.map(({ icon: Icon, title, text }, index) => <article key={title}><span className="gx-principle-index">0{index + 1}</span><Icon size={20} /><h3>{title}</h3><p>{text}</p></article>)}
            </div>
          </section>

          <footer className="gx-footer"><a className="gx-footer-brand" href={basePath + "/"}>GEOPRIX<span>WORLD MOTORSPORT</span></a><span>UM UNIVERSO EM CONSTRUÇÃO</span><span>© GEOPRIX</span></footer>
        </div>
      </section>
    </main>
  );
}
