require 'html-proofer'

options = {
    :assume_extension => true,
    :check_favicon => true,
    :check_html => true,
    :check_img_http => true,
    :url_ignore => [/skepticalscience.com/],
    :typhoeus => {
        :connecttimeout => 30,    # default: 10
        :timeout => 60            # default: 30
    },
    :cache => {
        :storage_dir => '.cache/.htmlproofer',
        :timeframe => '7d'
    },
    # :log_level => :debug
}

begin
    HTMLProofer.check_directory("./_site", options).run
rescue => msg
    puts "#{msg}"
    exit(false)
end
