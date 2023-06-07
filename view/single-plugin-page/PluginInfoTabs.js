import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ChevronBlue from "../../public/chevron-blue.svg";
import Devider from "../../components/Devider";
import parse from "html-react-parser";
const PluginInfoTabs = ({ pluginState }) => {


  useEffect(() => {
    const response =
      '\n<h4>Will this plugin work with my theme?</h4>\n<p>\n<p>Most likely, yes, provided your theme has at least one post type that support thumbnails and custom fields</p>\n<p>Pro-tip: If you use the <a href="https://www.wptools.tube/tube-theme" rel="nofollow ugc">.TUBE WordPress Theme</a> we guarantee it&#8217;ll work seamlessly.</p>\n</p>\n<h4>Why doesn&#8217;t the video appear on the post?</h4>\n<p>\n<p>It&#8217;s possible your theme is outputting the post content in an unconventional way, for example not using &#8220;the_content()&#8221; on the single post page. In this case, you may need to use the [tube_video] shortcode to place videos in your posts.</p>\n</p>\n<h4>How can I get an API key?</h4>\n<p>\n<p>To use this plugin, <strong>you&#8217;ll need to create an API key</strong> with YouTube, Vimeo, or Twitch. The API Keys settings page includes instructions for how to get an API Key from each of these sites.</p>\n</p>\n\n';

    const regex = /<h4>(.*?)<\/h4>/g;
    const h4Elements = response.match(regex);

    const regex2 = /<p>(.*?)<\/p>/g;
    const matches = response.match(regex2);
  }, [pluginState]);

  return (
    <>
      <div className="plugin-page-tabs">
        <ul
          className="nav nav-tabs plugin-tab-content"
          id="myTab"
          role="tablist"
        >
          <li className="nav-item">
            <a
              className="nav-link active"
              id="Description-tab"
              data-toggle="tab"
              href="#Description"
              role="tab"
              aria-controls="Description"
              aria-selected="true"
            >
              Description
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="Installation-tab"
              data-toggle="tab"
              href="#Installation"
              role="tab"
              aria-controls="Installation"
              aria-selected="false"
            >
              Installation
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="FAQ-tab"
              data-toggle="tab"
              href="#FAQ"
              role="tab"
              aria-controls="FAQ"
              aria-selected="false"
            >
              FAQ
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="Changelog-tab"
              data-toggle="tab"
              href="#Changelog"
              role="tab"
              aria-controls="Changelog"
              aria-selected="false"
            >
              Changelog
            </a>
          </li>
        </ul>
        <div className="only-mob-show mt-4">
          <Devider />
        </div>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane tab-pane-des show active tab-bg"
            id="Description"
            role="tabpanel"
            aria-labelledby="Description-tab"
          >
            <div className="text-fade-8 f-14">
              {/* <p className="semi-bold">MAILCHIMP FOR WORDPRESS</p> */}
              <p>{parse(`${pluginState?.sections?.description}`)}</p>
              {/* <p className="semi-bold">SOME (BUT NOT ALL) FEATURES</p>
              <ul>
                <li>Connect with your Mailchimp account in seconds. </li>
                <li>
                  Sign-up forms which are good looking, user-friendly and mobile
                  optimized. You have complete control over the form fields and
                  can send anything you like to Mailchimp.
                </li>
                <li>Well documented. Our knowledge base is updated daily.</li>
              </ul>
              <p className="semi-bold">WHAT IS MAILCHIMP?</p> */}
              {/* <p>
                Mailchimp is a newsletter service that allows you to send out
                email campaigns to a list of email subscribers. It is free for
                lists up to 2000 subscribers, which is why it is the
                newsletter-service of choice for thousands of businesses. This
                plugin allows you to tightly integrate your WordPress site with
                your Mailchimp account. If you are not yet using
                Mailchimp,&nbsp;
                <Link href="/">
                  <a>
                    creating an account is 100% free and only takes you about 30
                    seconds.
                  </a>
                </Link>
              </p> */}
              {/* <p className="semi-bold">SUPPORT</p> */}
              {/* <p className="pb-0">
                Use the WordPress.org plugin forums for community support where
                we try to help all of our users. If you found a bug, please
                create an issue on Github where we can act upon them more
                efficiently. If you’re a premium user, please use the email
                address inside the plugin for support as that will guarantee a
                faster response time. Please take a look at the Mailchimp for
                WordPress knowledge base as well.
              </p> */}
            </div>
          </div>
          <div
            className="tab-pane tab-bg"
            id="Installation"
            role="tabpanel"
            aria-labelledby="Installation-tab"
          >
            <div className="text-fade-8 f-14">
              {parse(`${pluginState?.sections?.installation}`)}

              {/* <p className="semi-bold">INSTALLING THE PLUGIN</p>

              <ol>
                <li>
                  In your WordPress admin panel, go to Plugins &gt; New Plugin,
                  search for Mailchimp for WordPress and click “Install now“
                </li>
                <li>
                  Alternatively, download the plugin and upload the contents of
                  mailchimp-for-wp.zip to your plugins directory, which usually
                  is /wp-content/plugins/.
                </li>
                <li>Activate the plugin </li>
                <li>
                  Set&nbsp;
                  <Link href="/">
                    <a className="underline">your API key</a>
                  </Link>
                  &nbsp; in the plugin settings.
                </li> */}
              {/* </ol> */}
            </div>
          </div>
          <div
            className="tab-pane tab-bg"
            id="FAQ"
            role="tabpanel"
            aria-labelledby="FAQ-tab"
          >
            <div className="faq-box">
              <div id="accordion">
                <div className="faq-card border-bg">
                  {parse(`${pluginState?.sections?.faq}`)}
                </div>
                {/* <div className="faq-card border-bg">
                  <div className="faq-card-header" id="headingThree">
                    <h5
                      className="mb-0 collapsed cursor-pointer"
                      data-toggle="collapse"
                      data-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      How to display a form in widget areas like the sidebar or
                      footer?
                      <span className="faq-icon">
                        <Image alt="" src={ChevronBlue} />
                      </span>
                    </h5>
                  </div>
                  <div
                    id="collapseThree"
                    className="collapse"
                    aria-labelledby="headingThree"
                    data-parent="#accordion"
                  >
                     <div className="card-body">
                      Go to Appearance &gt; Widgets and use the Mailchimp for WP
                      Form widget that comes with the plugin.
                    </div> 
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div
            className="tab-pane tab-bg"
            id="Changelog"
            role="tabpanel"
            aria-labelledby="Changelog-tab"
          >
            <div className="text-fade-8 f-14">
              {parse(`${pluginState?.sections?.changelog}`)}

              {/* <p className="semi-bold">3.0.2 - SEP 14, 2022</p>
              <ul>
                <li>
                  Fix mc4wp_get_request_ip_address() to return an IP address
                  that matches Mailchimp’s validation format when
                  X-Forwarded-For header contains a port component.
                </li>
              </ul>
              <p className="semi-bold">4.8.8 - AUG 25, 2022</p>
              <ul>
                <li>
                  Fix mc4wp_get_request_ip_address() to pass new Mailchimp
                  validation format. This fixes the “This value is not a valid
                  IP.” error some users using a proxy may have been seeing.
                </li>
              </ul>
              <p className="semi-bold">4.8.7 - MAR 2, 2022</p>
              <ul>
                <li>
                  Fix PHP 8.1 deprecation warnings in MC4WP_Container class.
                </li>
                <li>
                  Fix name of action hook that fires before Mailchimp settings
                  rows are displayed on the settings page. Thanks
                  LoonSongSoftware.
                </li>
                <li>Improve WPML compatibility. Thanks Sumit Singh.</li>
                <li> Fix deprecated function for AMP integration.</li>
                <li>
                  {" "}
                  Only allow unfiltered HTML if user has unfiltered_html
                  capability. Please read the below.
                </li>
              </ul>
              <p className="semi-bold">4.8.6 - JUN 24, 2021</p>
              <ul>
                <li>
                  Add nonce field to button for dismissing notice asking for
                  plugin review.
                </li>
                <li>Add strings from config/ directory to POT file.</li>
                <li>
                  {" "}
                  Add nonce check to AJAX endpoint for refreshing cached
                  Mailchimp lists.
                </li>
                <li>
                  {" "}
                  Add capability check to AJAX endpoint for retrieving list
                  details.
                </li>
                <li>
                  Schedule event to refresh cached Mailchimp list upon plugin
                  activation.
                </li>
              </ul>
              <p>
                Thanks to the team over at pluginvulnerabilities.com for
                bringing some of these changes to our attention.
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PluginInfoTabs;
