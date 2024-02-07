// Done by: See Wai Kee, Audrey

"use client";
import Image from 'next/image';
import styles from './page.module.css';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';

export default function About() {
  return (
    <div>
      <div>
        <Container className={styles.header}>
          <Image src="/cycling.png" width={1000} height={320} />
          <Image src="/mrt.jpg" width={1000} height={320} />
        </Container>
        <h1 className={styles.title}>Singapore's Transportation Scene</h1>
      </div>

      <Container className={styles.container}>
        <Accordion className={styles.accordion}>
          <Accordion.Item eventKey="0">
            <Accordion.Header className={styles.accordionheader}>Taking Buses Into the Modern Age</Accordion.Header>
            <Accordion.Body className={styles.text}>
              In 1970, based on a White Paper recommendation, 10 Chinese bus companies were consolidated into three
              which then merged in 1973 to form the Singapore Bus Service (SBS). <br />
              <br />
              In 1974, Government intervention led to the regulation and improvement of services, streamlining of bus
              routes, training for staff, repairing bus fleets and implementing policies to raise overall standards. <br />
              <br />
              The Bus Lane Scheme for peak hours was implemented in 1974 and enhanced over the years. In 1975, the
              City Shuttle Service Company began to serve commuters working in the Central Business District. <br />
              <br />
              To develop a more competitive and diverse bus industry, a second bus operating license was issued to
              Trans-Island Bus Services (TIBS) in 1982. <br />
              <br />
              In 1987, the SBS, SMRT and TIBS jointly set up TransitLink to develop a common fare platform. It would later
              become a subsidiary of LTA to manage concession schemes. <br />
              <br />
              Over the next few decades, buses evolved with improvements to capacity, comfort and accessibility. In 2006,
              nine wheelchair-accessible buses (WABs) were introduced. All buses will be wheelchair accessible by 2020. <br />
              <br />
              LTA introduced the Bus Service Enhancement Programme (BSEP) in 2012 and the Bus Contracting Model (BCM) in
              2016 to enhance connectivity and improve bus service levels. These LTA bus regulations serve to encourage
              competition, raise service standards and make public bus operators more responsive to changes in ridership
              and commuter needs. <br />
              <br />
              In tandem with the transition to BCM, a nation-wide vote was held to decide on new bus livery. The winner,
              Lush Green, edged out Bright Red by 114 votes, and is now used for all government-owned Singapore buses. <br />
              <br />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header className={styles.accordionheader}>Our Rail System</Accordion.Header>
            <Accordion.Body className={styles.text}>
              Developing and regulating Singapore’s land transport network is a balance between improving road capacity
              and maintaining a sustainable vehicle population while managing traffic flow. Development of bus and rail
              services has been matched by new infrastructure and policies to manage growing vehicle ownership. <br />
              <br />
              In 1967, the government commissioned a new land use and transport plan, later known as the Concept Plan,
              that would guide the location of the first expressways in Singapore. <br />
              <br />
              These are some of the key milestones in the development of our road network and the various measures we
              implemented over the years to manage road usage:
              <br />
              <Image src="/mrt timeline.jpg" height={2920} width={1000} className={styles.image} />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header className={styles.accordionheader}>Developing Roads and Managing Traffic</Accordion.Header>
            <Accordion.Body className={styles.text}>
              Developing and regulating Singapore’s land transport network is a balance between improving road capacity
              and maintaining a sustainable vehicle population while managing traffic flow. Development of bus and rail
              services has been matched by new infrastructure and policies to manage growing vehicle ownership. <br />
              <br />
              In 1967, the government commissioned a new land use and transport plan, later known as the Concept Plan,
              that would guide the location of the first expressways in Singapore. <br />
              <br />
              These are some of the key milestones in the development of our road network and the various measures we
              implemented over the years to manage road usage: <br />
              <Image src="/evolution road networks.jpg" height={2920} width={1000} className={styles.image} />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header className={styles.accordionheader}>An Intergrated Public Transport System</Accordion.Header>
            <Accordion.Body className={styles.text}>
              With the rail system bringing added connectivity to the bus and road network in the 1980s, Singapore’s
              public transport system moved towards a more integrated model.  <br />
              <br />
              LTA has worked to make getting around Singapore seamless, safe and efficient, whether on buses, aboard
              trains, by taxi or private hire cars, or on foot, bicycles or personal mobility devices.  <br />
              <br />
              The first step towards integration was the launch of a stored value magnetic strip fare card in 1990. This
              common payment system for bus and rail paved the way for contactless cards and the setting-up of EZ-Link as
              an LTA subsidiary. <br />
              <br />
              As the MRT system expanded to complement bus services, public transport operators also evolved. Bus operator
              TIBS and train operator SMRT merged in 2001, while bus operator SBS renamed itself as SBS Transit, reflecting
              the multi-modal nature of their companies.  <br />
              <br />
              The development of Integrated Transport Hubs allows commuters to seamlessly run errands in air-conditioned
              comfort as part of their journey. The first hub at Toa Payoh opened in 2002. At the same time, five older
              MRT stations (Dhoby Ghaut, Outram Park, Somerset, Novena and Tampines) were upgraded to include disabled-friendly
              facilities.  <br />
              <br />
              Distance fares were implemented in 2010 for a more equitable fare structure, and give commuters more flexibility
              and encourage them to take the most efficient travel route, whether by bus or train.  <br />
              <br />
              By 2013, the focus moved towards increasing public transport usage, increasing connectivity, improving journey
              times and ensuring that more train stations were closer to homes. The aim of the Walk Cycle Ride initiative was
              to make access to transport hubs more seamless. The Land Transport Master Plan 2040 (LTMP 2040) will set the
              vision for 2040 and the future of land transport in Singapore.  <br />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container >
    </div >
  );
}