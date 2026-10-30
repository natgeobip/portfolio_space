import Hero from '../components/Hero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import TabbedCarousel from '../components/TabbedCarousel.jsx'
import TeamGallery from '../components/TeamGallery.jsx'
import ProjectCarousel from '../components/ProjectCarousel.jsx'
import Footer from '../components/Footer.jsx'
import LogoCarousel from '../components/LogoCarousel.jsx'
import site from '../data/site.json'
import projects from '../data/projects.json'

const navLinks = [
  { label: 'WHO WE ARE', id: 'about' },
  { label: 'PROJECTS', id: 'projects' },
  { label: 'MEET OUR TEAM', id: 'team' },
  { label: 'CONTACT US', id: 'contact' },
]

export default function Home() {
  const { hero, about, dataSources, team, trusted } = site

  return (
    <div className="home">
      <Hero
        variant="home"
        navLinks={navLinks}
        eyebrow={hero.eyebrow}
        titleLogo={hero.titleLogo}
        titleLight={hero.titleLight}
        titleBold={hero.titleBold}
        text={hero.text}
        cta={hero.cta}
        ctaTarget="projects"
        banner={hero.image}
      />

      <LogoCarousel companies={trusted.companies} />

      <section className="section" id="about">
        <SectionHeading eyebrow={about.eyebrow} title={about.title} />
        <div className="about">
          <div className="about__text">
            {about.text.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
          <ul className="about__skills">
            {about.skills.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {dataSources && (
        <section className="section datasources-wrap" id="data">
          <div className="datasources">
            <div>
              <p className="eyebrow eyebrow--light">{dataSources.eyebrow}</p>
              <h3>{dataSources.title}</h3>
            </div>
            <ul>
              {dataSources.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section" id="projects">
        <SectionHeading eyebrow={site.projects.eyebrow} title={site.projects.title} />
        <ProjectCarousel projects={projects} />
      </section>

      <section className="section" id="team">
        <SectionHeading eyebrow={team.eyebrow} title={team.title} />
        <div className="team__text">
          {team.blocks.map((b) => (
            <div key={b.title}>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </div>
          ))}
        </div>
        <TabbedCarousel
          slides={team.teams.map((t) => ({ name: t.name, content: <TeamGallery members={t.members} narrow={t.narrow} /> }))}
        />
      </section>

      <Footer />
    </div>
  )
}