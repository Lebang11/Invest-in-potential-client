const NavBar = () => {
    return ( 

        <nav class="navbar navbar-expand-sm navbar-dark bg-secondary">
            <div class="container-fluid">
                <div className="justify-content-center">
                    <a class="navbar-brand " href="/">
                        <span><img src="photo-fotor-20231108212257.png" width="40" height="40"></img></span>
                        Invest in potential</a>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end me-4" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-link active" aria-current="page" href="/members">Members</a>
                        <a class="nav-link" href="/gallery">Gallery</a>
                    </div>
                </div>
            </div>
        </nav>

     );
}
 
export default NavBar;