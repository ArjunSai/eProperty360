using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(eProperty360.Startup))]
namespace eProperty360
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
