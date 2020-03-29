# This generator implements the glossary tag (<glossary>)

require 'nokogumbo'

module Jekyll
  class GlossaryTag
    class << self
      ###
      # Replace '<glossary id="xxx">...</glossary>' tags in document's HTML output with
      # likns to individual glossary items.
      def process(content, site, path)
        # Glossary items from the YAML file in _data/glossary.yaml.
        glossary = site.data['glossary']

        # Prepare the template for referencing glossary items.
        template_path = File.join(site.source, '_includes', 'glossary.html')
        template = site.liquid_renderer.file(template_path).parse(File.read(template_path))

        # Make sure the settings for rendering the template are the same as across
        # the whole site.
        liquid_options = site.config['liquid']
        template_info = {
          :registers        => { :site => site },
          :strict_filters   => liquid_options['strict_filters'],
          :strict_variables => liquid_options['strict_variables'],
        }

        # Parse the contents as an HTML5 fragment.
        doc = Nokogiri::HTML5.fragment(content)

        # Replace each of the glossary references with the rendered template.
        doc.search('glossary').each do |element|
          id = element['id']
          # Require that each reference specify the ID of the referenced item.
          if id.nil?
            Jekyll.logger.error "Glossary reference in #{path} has no id attribute"
            raise RuntimeError
          end

          # Require that the tag have contents, i.e. disallow <glossary id="xxx" />
          if element.children.empty?
            Jekyll.logger.error "Glossary tag cannot be empty in #{path}"
            raise RuntimeError
          end

          # Find the definition of the corresponding item in the glossary.
          item = glossary.find { |it| it['id'] == id }
          if item.nil?
            Jekyll.logger.error "Item with id #{id} referenced from #{path} does "\
                                "not exist in glossary"
            raise RuntimeError
          end

          # Render the template and replace the original element.
          context = { 'item' => item, 'inner' => element.inner_html }
          new_element = template.render!(context, template_info).strip
          element.replace new_element
        end

        doc.to_html
      end
    end
  end

  # Monkey-patching Jekyll's renderer in order to apply our changes precisely where we
  # need them, that is just before converters like Kramdown take over.
  class Renderer
    def convert(content)
      # This is our addition.
      content = GlossaryTag.process(content, site, document.relative_path)

      # The rest is original code from lib/jekyll/renderer.rb
      converters.reduce(content) do |output, converter|
        begin
          converter.convert output
        rescue StandardError => e
          Jekyll.logger.error "Conversion error:",
                              "#{converter.class} encountered an error while "\
                              "converting '#{document.relative_path}':"
          Jekyll.logger.error("", e.to_s)
          raise e
        end
      end
    end
  end
end
