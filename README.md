<a name="readme-top"></a>

<!-- HELLO! -->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!--
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

Add in shields once we have contributers and users using Commonroom
>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/tejitopia/commonroom">
    <img src="public/images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Commonroom</h3>

  <p align="center">
    Commonroom is an ephemeral chatroom for strangers
    <br />
    <a href="https://www.youtube.com/watch?v=HwTS8wVv7iE"><strong>The Origins of Commonroom »</strong></a>
    <br />
    <br />
    <a href="https://commonroom.chat">Visit Site</a>
    ·
    <a href="https://github.com/tejitopia/commonroom/issues/new">Report Bug</a>
    ·
    <a href="https://github.com/tejitopia/commonroom/issues/new">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About Commonroom</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#team">Team</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT COMMONROOM -->

## About Commonroom

Commonroom is an ephemeral text based chat application that revives the essence of fleeting, meaningful interactions reminiscent of hostel common rooms. It's a digital space where individuals can come together as a small group, hangout and share experiences, albeit briefly.

For context the application was originally built by TEJI aka Jet Williams, inspired by his travels around the world he wanted to replicate his experiances staying in hostels and hanging out with other travelers in an online space. Commonroom's core feature is the time limited chatrooms with small groups of strangers which self destruct at random intervals.

At Commonroom, we cherish your privacy as much as you do. All chats are ephemeral, disappearing after the session ends, leaving no digital footprint behind. Embrace the freedom of unburdened conversations; no data, no traces, just genuine interactions.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- ![Static Badge](https://img.shields.io/badge/HTML-6052C7?style=html)
- ![Static Badge](https://img.shields.io/badge/CSS-6052C7?style=html)
- ![Static Badge](https://img.shields.io/badge/JavaScript-6052C7?style=html)
- ![Static Badge](https://img.shields.io/badge/Node.js-6052C7?style=html)
- ![Static Badge](https://img.shields.io/badge/Express.js-6052C7?style=html)
- ![Static Badge](https://img.shields.io/badge/Socket.io-6052C7?style=html)
- ![Static Badge](https://img.shields.io/badge/Heroku-6052C7?style=html)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This section outlines how to set up Commonroom locally. By following these instructions, you'll have a local copy of the project up and running on your machine.

### Installation

1. **Install Node.js and npm**: Node.js is the runtime environment required to run JavaScript on the server side, and npm is a package manager for JavaScript. Install them from the [Node.js official website](https://nodejs.org/).

2. **Clone the repository**:

   ```sh
   git clone https://github.com/tejitopia/commonroom.git
   ```

3. **Navigate to the project directory**:

   ```sh
   cd commonroom
   ```

4. **Install NPM packages**: This will install all the dependencies, including Express.js and Socket.io, needed for Commonroom.

   ```sh
   npm install
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

<!-- LEAVING IN HERE INCASE WE WANT TO ADD
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

-->

<!-- TEAM -->

## Team

Founder & CEO - [TEJI](https://teji.io)

Co-Founder & CTO - [Alen Velocity](https://github.com/AlenVelocity)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [ ] Refactor Script.js
- [ ] Migrate to React
- [ ] Topic Specific Rooms
- [ ] Moderation Tools
- [ ] Darkmode
- [ ] Mini Games
- [ ] Mobile App

See the [open issues](https://github.com/tejitopia/commonroom/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make Commonroom better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give Commonroom a star! Thanks again!

### Contribution Workflow

Here's how we suggest you go about proposing a change to Commonroom:

1. **Fork the Project**: Start by forking the repository and then clone it locally.
2. **Create your Branch**: For new features and non-urgent bug fixes, branch off `develop`.
   - For features: `git checkout -b feature/YourAmazingFeature develop`
   - For bug fixes: `git checkout -b bugfix/YourBugFix develop`
   - For urgent hotfixes needed on master: `git checkout -b hotfix/YourHotfix master`
3. **Commit your Changes**: Commit your changes with a clear and descriptive message.
   - Example: `git commit -m 'Add some AmazingFeature'`
4. **Push to Your Fork**: Push your changes to your fork.
   - Example: `git push origin feature/YourAmazingFeature`
5. **Open a Pull Request**: Go to our repo and open a pull request from your feature, bugfix, or hotfix branch to the appropriate branch on the main repository.
   - For features and bug fixes, target the `develop` branch.
   - For hotfixes, target the `master` branch.
6. **Code Review**: Wait for the code review and address any feedback.

### Before Submitting

Before submitting your pull request, please ensure the following:

- Your code follows Commonroom's style and contribution guidelines.
- Your changes are well-documented and include any necessary updates to documentation.
- You've tested your changes thoroughly.

### Pull Request Process

Once you've submitted your pull request, we will review your code. We may suggest changes, improvements, or ask for further clarification. This is a big part of how open source works, so don't be discouraged! This feedback loop is valuable and helps everyone learn and improve.

Once your pull request is approved and merged, your contributions will be publicly acknowledged.

Thank you for your contributions, and we look forward to seeing your innovative and fantastic work!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the GNU General Public License v3.0. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

TEJI - [@TEJITOPIA](https://x.com/tejitopia) - hello@tejitopia.com

Alen - [@AlenVelocity](https://x.com/alenvelocity)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- Thank you to my mum & dad for the endless love and support
- Thank you to The Internet for providing us with free resources to learn how to create anything we want
- Thank you to all the contributers who make building projects like this possible

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

<!--

[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png

-->

<!-- ABOUT THIS README.MD -->
<!--
I used Best-README-Template by vi-dev0 to help write Commonroom's README.
You can checkout the template here: https://github.com/othneildrew/Best-README-Template/tree/master
-->
