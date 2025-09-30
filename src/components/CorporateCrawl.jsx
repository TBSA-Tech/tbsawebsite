import React from "react";
import "./corporateCrawl.css";

const FORM_URL = "https://forms.office.com/r/ctu7SibLET"; // Live registration form URL

const images = [
	"/img/events/CC_crawl-banner.jpeg",
	"/img/events/CC-1.jpeg",
	"/img/events/CC-2.jpeg",
	"/img/events/CC-3.jpeg",
	"/img/events/CC-5.jpeg",
	"/img/events/CC-6.jpeg",
	"/img/events/CC-7.jpeg",
];

export const CorporateCrawl = () => {
	return (
		<section id="corporate-crawl" className="cc-section">
			<div className="cc-container">
				<div className="cc-title-wrap">
					<h1 className="cc-title">CORPORATE CRAWL 2025</h1>
				</div>
				<p className="cc-details-head">October 3rd | 11AM – 3PM</p>
				<br></br>
				<div className="cc-block cc-intro-row">
					<div className="cc-intro-left">
						<img className="cc-intro-hero" src="/img/events/CC-4.jpeg" alt="Corporate Crawl highlight" loading="lazy" />
					</div>
					<div className="cc-intro-right">
						<p className="cc-subtitle">Whether you’re aiming to grow your network, explore careers, or just enjoy the energy, this is one event you don't wanna miss.</p>
						<br></br>
						<br></br>
						
						<p className="cc-subtitle">Very Limited Spots — Register For Free Today!</p>
						
						<br></br>
						<br></br>
						<div className="cc-cta-wrap">
							<a href={FORM_URL} className="cc-cta" target="_blank" rel="noreferrer">Register Now</a>
						</div>
					</div>
				</div>
				<div className="cc-separator" />
				<div className="cc-block"><div className="cc-title-wrap"><h2 className="cc-section-heading">Special Thanks</h2></div> <br></br>
				<div className="cc-cohost-wrap" aria-label="Event co-host">
					<div className="cc-cohost">
						<div className="cc-cohost-brand">
							<img src="/img/events/corporatecrawl2025/pkcc-logo.png" alt="Peterborough + Kawarthas Chamber of Commerce" loading="lazy" />
						</div>
					</div>
				</div></div>

					<div className="cc-details">
					
					<div className="cc-block cc-logos-wrap">
						<br></br>
						<br></br>
						<div className="cc-title-wrap"><h2 className="cc-section-heading">Companies In Our Crawl</h2></div>
						<br></br>
						<div className="cc-logos-marquee" aria-label="Participating companies">
							<div className="cc-logos-track">
								<div className="cc-logo-item">
									<img src="/img/events/corporatecrawl2025/scotia-logo.png" alt="Scotiabank" loading="lazy" />
								</div>
								<div className="cc-logo-item">
									<img src="/img/events/corporatecrawl2025/oparks-logo.png" alt="Ontario Parks" loading="lazy" />
								</div>
								<div className="cc-logo-item">
									<img src="/img/events/corporatecrawl2025/gauvreau-logo.png" alt="Gauvreau Accounting" loading="lazy" />
								</div>
								<div className="cc-logo-item">
									<img src="/img/events/corporatecrawl2025/dbia-logo.png" alt="DBIA" loading="lazy" />
								</div>
								<div className="cc-logo-item">
									<img src="/img/events/corporatecrawl2025/ja-logo.png" alt="JA North" loading="lazy" />
								</div>
								<div className="cc-logo-item">
									<img src="/img/events/corporatecrawl2025/cf-logo.png" alt="Community Futures" loading="lazy" />
								</div>
								{/* Duplicate for seamless looping */}
								<div className="cc-logo-item" aria-hidden="true">
									<img src="/img/events/corporatecrawl2025/scotia-logo.png" alt="" loading="lazy" />
								</div>
								<div className="cc-logo-item" aria-hidden="true">
									<img src="/img/events/corporatecrawl2025/oparks-logo.png" alt="" loading="lazy" />
								</div>
								<div className="cc-logo-item" aria-hidden="true">
									<img src="/img/events/corporatecrawl2025/gauvreau-logo.png" alt="" loading="lazy" />
								</div>
								<div className="cc-logo-item" aria-hidden="true">
									<img src="/img/events/corporatecrawl2025/dbia-logo.png" alt="" loading="lazy" />
								</div>
								<div className="cc-logo-item" aria-hidden="true">
									<img src="/img/events/corporatecrawl2025/ja-logo.png" alt="" loading="lazy" />
								</div>
								<div className="cc-logo-item" aria-hidden="true">
									<img src="/img/events/corporatecrawl2025/cf-logo.png" alt="" loading="lazy" />
								</div>
							</div>
						</div>
					</div>
					<br></br>
					<br></br>
					<br></br>
					
				</div>
				<div className="cc-separator" />
				<div className="cc-content cc-block">
				<br></br>
				<br></br>
				<div className="cc-title-wrap"><h2 className="cc-section-heading">Memories from 2024's Crawl</h2></div>
					<br></br>
					<br></br>
					<div className="cc-image-list">
						{images.map((src, idx) => (
							<div className="cc-image-item" key={src}>
								<img src={src} alt={`Corporate Crawl ${idx + 1}`} loading="lazy" />
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default CorporateCrawl;


