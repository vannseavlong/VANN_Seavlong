import React from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Education from '../components/Education'
import Experience from '../components/Experience'
import Awards from '../components/Awards'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>VANN Seavlong - Portfolio</title>
        <meta name="description" content="VANN Seavlong - Software Engineer & Full Stack Developer Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Education />
          <Experience />
          <Awards />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
