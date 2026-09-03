import type { ComponentType } from "react";
import {
  BadgeCheck,
  Banknote,
  Briefcase,
  Building2,
  CreditCard,
  GraduationCap,
  Handshake,
  Heart,
  HeartHandshake,
  IdCard,
  Landmark,
  MapPin,
  Megaphone,
  Radio,
  Rocket,
  Shield,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wallet,
  Wifi,
} from "lucide-react";
import { CoverBadge, CeuMark, UnitelMark } from "@/components/brand/logos";
import {
  FeatureCard,
  IconOrb,
  Lead,
  ListRow,
  Pill,
  Slide,
  SlideHeader,
  SplitShell,
  StepFlow,
  Title,
} from "@/components/deck/primitives";
import { cn } from "@/lib/cn";

export type SlideDef = {
  id: string;
  label: string;
  View: ComponentType;
};

function Art({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <img src={src} alt={alt} className={cn("art-bleed object-cover", className)} />
  );
}

function SlideCover() {
  return (
    <Slide theme="blue">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <CoverBadge />
        <p className="mt-[clamp(1.2rem,3cqi,1.8rem)] max-w-md font-display text-[clamp(1rem,2.2cqi,1.35rem)] font-semibold leading-snug text-white">
          Conectando a próxima geração de líderes de Angola
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[clamp(0.72rem,1.3cqi,0.88rem)] font-semibold text-white/80">
        <UnitelMark iconClassName="ring-1 ring-white/40 shadow-sm" />
        <CeuMark iconClassName="drop-shadow-xs" />
        <span className="tracking-wide">Ano académico 2026/2027</span>
      </div>
    </Slide>
  );
}

function SlideContext() {
  return (
    <Slide theme="paper">
      <SlideHeader pill="Enquadramento" mark="ceu" />
      <Title>O cartão que une o ensino superior angolano</Title>
      <Lead>
        O CEU é a primeira plataforma de identificação estudantil, inclusão financeira e acesso a
        benefícios — oficializada para toda a comunidade universitária.
      </Lead>
      <div className="mt-auto grid flex-1 grid-cols-1 gap-3 pt-[clamp(1rem,2.4cqi,1.6rem)] md:grid-cols-3 md:grid-rows-1">
        <FeatureCard
          accent="blue"
          icon={Users}
          title="Comunidade jovem"
          body="Milhares de estudantes do ensino superior prontos para decidir o percurso académico e profissional — agora reunidos numa plataforma única."
        />
        <FeatureCard
          accent="blue"
          icon={Landmark}
          title="Selo ministerial"
          body="Por iniciativa do MESCTI, em junho de 2026 o CEU foi oficializado como o cartão dos estudantes do ensino superior em Angola."
        />
        <FeatureCard
          accent="blue"
          icon={MapPin}
          title="Escala nacional"
          body="Credenciado para todas as IES do país: mais de 70.000 estudantes integrados, com potencial para 120.000 no ensino superior público."
        />
      </div>
    </Slide>
  );
}

function SlideOpportunity() {
  return (
    <Slide theme="paper">
      <SlideHeader pill="A oportunidade" mark="unitel" />
      <Title>Uma geração inteira, num único ponto de contacto</Title>
      <Lead>
        A adesão ao CEU torna-se o momento em que a UNITEL se liga, de forma oficial, à jornada
        universitária de cada estudante.
      </Lead>
      <StepFlow
        accent="blue"
        steps={[
          { icon: Shield, label: "Cartão oficial", sub: "Selo MESCTI 2026" },
          { icon: GraduationCap, label: "Adesão nacional", sub: "Todas as IES" },
          { icon: Wallet, label: "Recarga Unitel", sub: "3.000 Kz" },
          { icon: Smartphone, label: "My Unitel", sub: "Activação de benefícios" },
          { icon: Sparkles, label: "4 anos de marca", sub: "Toda a jornada" },
        ]}
      />
    </Slide>
  );
}

function SlideVision() {
  return (
    <SplitShell
      tone="blue"
      visual={
        <div className="relative h-full min-h-52">
          <Art
            src="/art/burst-orange.jpg"
            alt="Colagem gráfica de capelo, livro, telemóvel e maleta sobre fundo laranja"
            className="absolute inset-0 size-full"
          />
          <div className="absolute inset-x-0 top-0 h-[32%] bg-linear-to-b from-ceu via-ceu/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[48%] bg-linear-to-t from-ceu via-ceu/90 to-transparent" />
          <div className="relative z-10 flex h-full flex-col justify-end pad-slide">
            <p className="text-hero text-cream">
              liga
              <br />
              -te
            </p>
            <p className="mt-3 font-display text-[clamp(0.78rem,1.6cqi,1.05rem)] font-bold uppercase tracking-[0.18em] text-white">
              ao teu futuro
            </p>
          </div>
        </div>
      }
    >
      <SlideHeader pill="Visão da parceria" mark="unitel" />
      <Title>A operadora oficial da comunidade universitária</Title>
      <Lead>
        Mais do que uma campanha comercial, esta iniciativa cria uma relação duradoura entre a
        UNITEL e a próxima geração de profissionais, empreendedores e líderes de Angola.
      </Lead>
      <ul className="mt-auto">
        <ListRow icon={Radio} accent="blue">
          Operadora Oficial da Comunidade Universitária de Angola
        </ListRow>
        <ListRow icon={Wifi} accent="blue">
          Conectividade, inclusão financeira e benefícios exclusivos
        </ListRow>
        <ListRow icon={Sparkles} accent="blue">
          A marca que acompanha o estudante durante 4 anos de jornada
        </ListRow>
      </ul>
    </SplitShell>
  );
}

function SlideAudience() {
  return (
    <Slide theme="paper">
      <SlideHeader pill="Público-alvo" mark="unitel" />
      <div className="grid flex-1 grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <h2 className="font-display text-[clamp(1.05rem,2cqi,1.35rem)] font-extrabold text-ink">
              Público principal
            </h2>
            <Pill tone="blue">Foco</Pill>
          </div>
          <ul>
            <ListRow icon={GraduationCap} accent="blue">
              Estudantes do ensino superior em Angola
            </ListRow>
            <ListRow icon={Users} accent="blue">
              Jovens em fase de escolha académica e profissional
            </ListRow>
            <ListRow icon={Target} accent="blue">
              Nova geração de profissionais, empreendedores e líderes
            </ListRow>
            <ListRow icon={Briefcase} accent="blue">
              Jovens a entrar no mercado de trabalho
            </ListRow>
          </ul>
        </div>
        <div>
          <div className="mb-2 flex items-center gap-2">
            <h2 className="font-display text-[clamp(1.05rem,2cqi,1.35rem)] font-extrabold text-ink">
              Ecossistema
            </h2>
            <Pill>Parceiros</Pill>
          </div>
          <ul>
            <ListRow icon={Building2} accent="blue">
              Instituições de ensino superior
            </ListRow>
            <ListRow icon={Landmark} accent="blue">
              MESCTI e rede nacional CEU
            </ListRow>
            <ListRow icon={Handshake} accent="blue">
              Parceiros comerciais e benefícios no terreno
            </ListRow>
            <ListRow icon={Rocket} accent="blue">
              Empresas e startups ligadas à comunidade
            </ListRow>
            <ListRow icon={Heart} accent="blue">
              Pais e encarregados de educação
            </ListRow>
          </ul>
        </div>
      </div>
    </Slide>
  );
}

function SlideModel() {
  return (
    <Slide theme="paper" flush>
      <div className="grid h-full min-h-[inherit] grid-cols-1 md:grid-cols-[0.52fr_0.48fr]">
        <div className="slide-enter flex flex-col pad-slide">
          <SlideHeader pill="Modelo da parceria" mark="unitel" />
          <Title>Como o estudante entra no ecossistema</Title>
          <div className="mt-auto grid grid-cols-2 gap-3 pt-5">
            <FeatureCard
              n="01"
              icon={IdCard}
              title="Registo no CEU"
              body="O estudante realiza o seu registo na plataforma CEU."
            />
            <FeatureCard
              n="02"
              icon={Smartphone}
              title="My Unitel"
              body="É redireccionado para a aplicação My Unitel para activar os benefícios."
            />
            <FeatureCard
              n="03"
              icon={Banknote}
              title="Recarga 3.000 Kz"
              body="Efectua um carregamento de saldo Unitel no valor de 3.000 Kz."
            />
            <FeatureCard
              n="04"
              icon={CreditCard}
              title="Cartão CEU"
              body="Recebe o Cartão Nacional de Estudante Universitário — digital e físico."
            />
          </div>
        </div>
        <div className="relative hidden overflow-hidden md:block">
          <Art
            src="/art/arch-orange.jpg"
            alt="Estudantes a entrar num arco laranja de evento universitário"
            className="absolute inset-0 size-full"
          />
        </div>
      </div>
    </Slide>
  );
}

function SlideFlow() {
  return (
    <SplitShell
      tone="blue"
      visual={
        <div className="relative flex h-full min-h-52 flex-col justify-between pad-slide">
          <div />
          <div>
            <p className="text-hero">
              COMO
              <br />
              FUNCIONA
            </p>
            <div className="wave-field" />
          </div>
        </div>
      }
    >
      <SlideHeader pill="Fluxo de utilização" mark="unitel" />
      <Title>O fluxo principal permanece no CEU</Title>
      <Lead>
        Estudante → Plataforma CEU → Aplicação My Unitel → Activação de benefícios → Ecossistema
        CEU.
      </Lead>
      <div className="mt-auto grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <p className="text-lead text-ink-soft">
          O modelo reforça a utilização da My Unitel sem retirar o centro de gravidade à plataforma
          CEU — identificação oficial, descontos, inclusão financeira e benefícios de
          telecomunicações no mesmo percurso.
        </p>
        <Art
          src="/art/phone-student.jpg"
          alt="Estudante com telemóvel a activar benefícios Unitel"
          className="hidden h-[min(42cqi,16rem)] w-[min(38cqi,14rem)] rounded-card object-cover md:block"
        />
      </div>
    </SplitShell>
  );
}

function SlideStudent() {
  return (
    <Slide theme="paper">
      <SlideHeader pill="O que o estudante recebe" mark="unitel" />
      <Title>Um cartão. Um ecossistema. Quatro portas de entrada.</Title>
      <div className="mt-auto grid flex-1 grid-cols-1 gap-3 pt-[clamp(1rem,2.2cqi,1.5rem)] sm:grid-cols-2 sm:grid-rows-2">
        <FeatureCard
          n="01"
          icon={IdCard}
          title="Identificação estudantil oficial"
          body="O Cartão Nacional de Estudante Universitário, digital e físico, reconhecido em todo o país."
          tag="Identidade"
        />
        <FeatureCard
          n="02"
          featured
          icon={Wifi}
          title="Benefícios exclusivos UNITEL"
          body="Conectividade e vantagens de telecomunicações associadas à adesão — a UNITEL como operadora da comunidade."
          tag="Liga-te"
        />
        <FeatureCard
          n="03"
          icon={BadgeCheck}
          title="Rede nacional de descontos CEU"
          body="Acesso à rede de parceiros comerciais e benefícios exclusivos para a comunidade universitária."
          tag="Vantagens"
        />
        <FeatureCard
          n="04"
          icon={Wallet}
          title="Inclusão financeira"
          body="Entrada no ecossistema financeiro CEU, incluindo cartões bancários co-branded CEU e BCI."
          tag="Inclusão"
        />
      </div>
    </Slide>
  );
}

function SlideRevenue() {
  return (
    <Slide theme="paper">
      <SlideHeader pill="Oportunidade de negócio" mark="unitel" />
      <Title>Receita potencial da campanha</Title>
      <Lead>
        Cada adesão começa com uma recarga Unitel de 3.000 Kz — receita directa, à escala da
        comunidade universitária nacional.
      </Lead>
      <div className="mt-auto grid flex-1 grid-cols-1 gap-4 pt-[clamp(1rem,2.4cqi,1.6rem)] md:grid-cols-2">
        <article className="flex h-full flex-col rounded-card bg-white p-[clamp(1.1rem,2.6cqi,1.8rem)] shadow-(--shadow-border)">
          <p className="text-kicker text-ceu">Fase inicial</p>
          <p className="mt-3 font-display text-[clamp(2.1rem,5.4cqi,3.6rem)] font-extrabold leading-none tracking-tight text-ink">
            150 M Kz
          </p>
          <p className="mt-3 text-lead text-ink-soft">
            50.000 estudantes × 3.000 Kz em recargas Unitel.
          </p>
        </article>
        <article className="flex h-full flex-col rounded-card bg-ceu p-[clamp(1.1rem,2.6cqi,1.8rem)] text-white">
          <p className="text-kicker text-white/80">Potencial de escala</p>
          <p className="mt-3 font-display text-[clamp(2.1rem,5.4cqi,3.6rem)] font-extrabold leading-none tracking-tight">
            360 M Kz
          </p>
          <p className="mt-3 text-lead text-white/88">
            120.000 estudantes × 3.000 Kz — a totalidade do ensino superior público.
          </p>
        </article>
      </div>
    </Slide>
  );
}

function SlideVisibility() {
  const items = [
    { icon: CreditCard, title: "50.000+ cartões CEU", body: "A marca acompanha o estudante no bolso." },
    { icon: Landmark, title: "Co-branded CEU e BCI", body: "Presença em cartões bancários da comunidade." },
    { icon: Smartphone, title: "My Unitel no centro", body: "Mais de 50.000 estudantes a usar a app." },
    { icon: GraduationCap, title: "Eventos universitários", body: "Activações académicas em todo o país." },
    { icon: Megaphone, title: "Campanhas digitais", body: "Comunicação directa com a comunidade." },
    { icon: Radio, title: "Materiais promocionais", body: "Exposição contínua nos pontos de adesão." },
    { icon: MapPin, title: "Plataforma CEU", body: "Presença no destino digital da comunidade." },
    { icon: Sparkles, title: "4 anos de jornada", body: "Do primeiro ano à formatura." },
  ];
  return (
    <Slide theme="paper">
      <SlideHeader pill="Visibilidade e posicionamento" mark="unitel" />
      <Title>A marca entra no quotidiano universitário</Title>
      <div className="mt-auto grid flex-1 grid-cols-1 gap-3 pt-[clamp(0.9rem,2cqi,1.4rem)] sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
        {items.map((item) => (
          <article
            key={item.title}
            className="flex h-full flex-col rounded-tile bg-white p-[clamp(0.85rem,1.8cqi,1.2rem)] shadow-(--shadow-border)"
          >
            <IconOrb icon={item.icon} accent="blue" size="sm" />
            <h3 className="mt-3 text-card-title text-ink">{item.title}</h3>
            <p className="mt-1 text-card-body text-ink-soft">{item.body}</p>
          </article>
        ))}
      </div>
    </Slide>
  );
}

function SlideKpis() {
  const kpis = [
    { icon: GraduationCap, value: "80.000+", label: "Estudantes universitários" },
    { icon: Handshake, value: "50+", label: "Parceiros comerciais" },
    { icon: MapPin, value: "21", label: "Províncias de Angola" },
    { icon: Users, value: "88", label: "Colaboradores no terreno" },
    { icon: CreditCard, value: "50.000+", label: "Cartões CEU emitidos" },
  ];
  return (
    <Slide theme="paper">
      <SlideHeader pill="Metas 2026/2027" mark="unitel" />
      <Title>Indicadores-chave da parceria</Title>
      <Lead>Uma operação nacional, com presença física e digital em todo o país.</Lead>
      <div className="mt-auto grid flex-1 grid-cols-2 gap-3 pt-[clamp(1rem,2.2cqi,1.5rem)] md:grid-cols-5">
        {kpis.map((kpi) => (
          <article
            key={kpi.label}
            className="flex h-full flex-col items-center rounded-card bg-white px-3 py-[clamp(1rem,2.2cqi,1.5rem)] text-center shadow-(--shadow-border)"
          >
            <IconOrb icon={kpi.icon} accent="blue" />
            <p className="mt-3 font-display text-[clamp(1.35rem,2.8cqi,1.9rem)] font-extrabold leading-none tracking-tight text-ink">
              {kpi.value}
            </p>
            <p className="mt-2 text-card-body text-ink-soft">{kpi.label}</p>
          </article>
        ))}
      </div>
    </Slide>
  );
}

function SlideBenefits() {
  return (
    <Slide theme="paper">
      <SlideHeader pill="Benefícios para a UNITEL" mark="unitel" />
      <Title>Valor comercial, institucional e de marca</Title>
      <div className="mt-auto grid flex-1 grid-cols-1 gap-3 pt-[clamp(0.9rem,2cqi,1.35rem)] sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
        <FeatureCard
          n="01"
          icon={TrendingUp}
          title="Aquisição de clientes"
          body="Captação de milhares de estudantes universitários através de uma campanha nacional."
          tag="Crescimento"
        />
        <FeatureCard
          n="02"
          featured
          icon={HeartHandshake}
          title="Fidelização de 4 anos"
          body="Uma ligação de longo prazo durante toda a jornada académica — a marca que acompanha o estudante."
          tag="Relação"
        />
        <FeatureCard
          n="03"
          icon={Smartphone}
          title="Mais My Unitel"
          body="Mais de 50.000 estudantes universitários passam a utilizar a aplicação My Unitel."
          tag="Produto"
        />
        <FeatureCard
          n="04"
          icon={Sparkles}
          title="Posicionamento estratégico"
          body="Associação da marca à educação, juventude, inovação e inclusão digital."
          tag="Marca"
        />
        <FeatureCard
          n="05"
          icon={Megaphone}
          title="Comunicação directa"
          body="Acesso privilegiado à maior comunidade universitária organizada de Angola."
          tag="Alcance"
        />
        <FeatureCard
          n="06"
          icon={BadgeCheck}
          title="Exclusividade sectorial"
          body="Possibilidade de posicionamento como Parceiro Oficial de Telecomunicações do CEU."
          tag="Exclusivo"
        />
      </div>
    </Slide>
  );
}

function SlideCampaign() {
  return (
    <SplitShell
      tone="blue"
      visual={
        <div className="relative h-full min-h-52">
          <Art
            src="/art/climb-orange.jpg"
            alt="Estudante a subir os degraus da jornada académica"
            className="absolute inset-0 size-full object-contain object-bottom p-6"
          />
        </div>
      }
    >
      <SlideHeader pill="Conceito da campanha" mark="unitel" />
      <Title>Liga-te ao Teu Futuro</Title>
      <Lead>
        Compra uma recarga Unitel de 3.000 Kz e recebe o teu Cartão Nacional de Estudante
        Universitário com vários benefícios.
      </Lead>
      <p className="mt-4 max-w-152 text-lead text-ink-soft">
        Uma iniciativa que une conectividade, educação, inclusão financeira e oportunidades para
        milhares de estudantes em todo o país.
      </p>
      <div className="mt-auto flex flex-wrap gap-2 pt-6">
        {["Conectividade", "Educação", "Inclusão", "Oportunidades"].map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-paper px-3 py-1.5 font-display text-[0.72rem] font-bold text-ceu"
          >
            {tag}
          </span>
        ))}
      </div>
    </SplitShell>
  );
}

function SlideContact() {
  return (
    <Slide theme="blue" flush>
      <div className="relative flex min-h-48 flex-[0.55] flex-col items-center justify-center pad-slide">
        <div className="dot-field" />
        <div className="relative z-10 rounded-4xl bg-white px-[8%] py-[7%] text-center shadow-[0_24px_60px_-28px_rgb(80,20,0,0.45)]">
          <div className="flex justify-center text-[clamp(1.8rem,5.4cqi,3.2rem)] text-ceu">
            <UnitelMark />
          </div>
          <div className="mt-3 flex items-center justify-center gap-3 text-ink">
            <span className="h-px w-8 bg-line" />
            <CeuMark className="text-[clamp(0.95rem,2.4cqi,1.35rem)]" />
            <span className="h-px w-8 bg-line" />
          </div>
          <p className="mt-3 font-display text-[clamp(0.72rem,1.3cqi,0.88rem)] font-semibold tracking-wide text-ink-soft">
            Orientação académica e profissional
          </p>
        </div>
      </div>
      <div className="relative flex flex-[0.45] flex-col justify-center bg-white px-[clamp(1.2rem,4.5cqi,3.6rem)] py-[clamp(1.2rem,3cqi,2.2rem)] text-ink">
        <p className="max-w-160 text-lead">
          A UNITEL como Operadora Oficial da Comunidade Universitária de Angola — uma parceria com
          impacto comercial, institucional e social, capaz de gerar valor para ambas as organizações.
        </p>
        <p className="mt-3 max-w-160 font-display text-[clamp(0.95rem,1.7cqi,1.15rem)] font-bold text-ink">
          Juntos, ligamos a próxima geração ao seu futuro.
        </p>
        <div className="mt-6 inline-flex w-fit overflow-hidden rounded-full">
          <span className="bg-ceu px-5 py-3 font-display text-[clamp(0.72rem,1.2cqi,0.82rem)] font-bold tracking-wide text-white">
            CONTACTOS
          </span>
          <a
            href="tel:+244923698903"
            className="bg-ink px-5 py-3 font-display text-[clamp(0.78rem,1.3cqi,0.95rem)] font-bold text-white"
          >
            +244 923 698 903
          </a>
        </div>
      </div>
    </Slide>
  );
}

export const SLIDES: SlideDef[] = [
  { id: "capa", label: "Capa", View: SlideCover },
  { id: "enquadramento", label: "Enquadramento", View: SlideContext },
  { id: "oportunidade", label: "Oportunidade", View: SlideOpportunity },
  { id: "visao", label: "Visão", View: SlideVision },
  { id: "publico", label: "Público", View: SlideAudience },
  { id: "modelo", label: "Modelo", View: SlideModel },
  { id: "fluxo", label: "Como funciona", View: SlideFlow },
  { id: "estudante", label: "O estudante", View: SlideStudent },
  { id: "negocio", label: "Negócio", View: SlideRevenue },
  { id: "visibilidade", label: "Visibilidade", View: SlideVisibility },
  { id: "metas", label: "Metas", View: SlideKpis },
  { id: "beneficios", label: "UNITEL", View: SlideBenefits },
  { id: "campanha", label: "Campanha", View: SlideCampaign },
  { id: "contactos", label: "Contactos", View: SlideContact },
];
